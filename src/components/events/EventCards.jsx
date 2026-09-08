import { useEffect, useMemo, useState } from "react";

import EventCardItem from "./EventCardItem";
import EventDetailsLayout from "./EventDetailsLayout";
import { useRSVP } from "../../context/RSVPContext";
import { useAuth } from "../../context/AuthContext";
import useRequireAuth from "../../hooks/useRequireAuth";

import { getEvents, getEvent } from "../../services/eventService";
import { createRSVP, cancelRSVP, getMyRSVP } from "../../services/rsvpService";

import toast from "react-hot-toast";
import DiscoverSkeleton from "../skeletons/DiscoverSkeleton";

import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/motion";

export default function EventCards({
  category = null,
  showAll = false,
  events: providedEvents = null,
}) {
  const { addRsvp, cancelRsvp: removeRsvp } = useRSVP();
  const { user } = useAuth();
  const { requireAuth } = useRequireAuth();

  const [events, setEvents] = useState(providedEvents || []);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myRSVP, setMyRSVP] = useState(null);
  const [loading, setLoading] = useState(!providedEvents);

  useEffect(() => {
    if (providedEvents) {
      let filtered = [...providedEvents];

      if (category) {
        filtered = filtered.filter(
          (event) => event.category?.toLowerCase() === category.toLowerCase(),
        );
      }

      if (!showAll) {
        filtered = filtered.slice(0, 12);
      }

      setEvents(filtered);
      setLoading(false);
      return;
    }

    async function loadEvents() {
      try {
        const data = await getEvents({
          date: "upcoming",
        });

        let filtered = data.events || [];

        if (category) {
          filtered = filtered.filter(
            (event) => event.category?.toLowerCase() === category.toLowerCase(),
          );
        }

        if (!showAll) {
          filtered = filtered.slice(0, 12);
        }

        setEvents(filtered);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, [category, showAll, providedEvents]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedEvent(null);
      setMyRSVP(null);
      return;
    }

    let mounted = true;

    async function loadSelectedEvent() {
      try {
        const data = await getEvent(selectedId);
        const event = data?.event || data;

        if (!mounted) return;

        setSelectedEvent(event);

        if (user) {
          try {
            const rsvp = await getMyRSVP(selectedId);

            if (mounted) {
              setMyRSVP(rsvp?.rsvp || null);
            }
          } catch {
            if (mounted) {
              setMyRSVP(null);
            }
          }
        } else {
          setMyRSVP(null);
        }
      } catch (error) {
        console.error("LOAD EVENT DETAILS ERROR:", error);

        if (mounted) {
          setSelectedEvent(null);
          setMyRSVP(null);
        }
      }
    }

    loadSelectedEvent();

    return () => {
      mounted = false;
    };
  }, [selectedId, user]);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  const currentIndex = useMemo(
    () => events.findIndex((event) => event._id === selectedId),
    [events, selectedId],
  );

  const handleNavigate = (direction) => {
    if (!selectedId || currentIndex === -1) return;

    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex < 0 || nextIndex >= events.length) return;

    setSelectedId(events[nextIndex]._id);
  };

  const handleRsvp = async (tickets = 1) => {
    if (!requireAuth()) return;

    try {
      await createRSVP(selectedId, tickets);

      const rsvp = await getMyRSVP(selectedId);

      setMyRSVP(rsvp?.rsvp || null);

      addRsvp(selectedEvent, rsvp?.rsvp);

      toast.success(
        selectedEvent?.requireApproval
          ? "Registration request submitted successfully."
          : "RSVP confirmed successfully.",
      );
    } catch (error) {
      console.error("DISCOVER RSVP ERROR:", error);
      toast.error(error.message || "Failed to submit RSVP.");
    }
  };

  const handleCancel = async () => {
    if (!requireAuth()) return;

    try {
      await cancelRSVP(selectedId);

      setMyRSVP(null);
      removeRsvp(selectedId);

      toast.success("Registration cancelled successfully.");
    } catch (error) {
      console.error("DISCOVER CANCEL ERROR:", error);
      toast.error(error.message || "Failed to cancel registration.");
    }
  };

  if (loading) {
    return <DiscoverSkeleton />;
  }

  const eventHostId =
    typeof selectedEvent?.host === "object"
      ? selectedEvent?.host?._id || selectedEvent?.host?.id
      : selectedEvent?.host;

  const currentUserId = user?._id || user?.id;

  const isHost =
    Boolean(eventHostId) &&
    Boolean(currentUserId) &&
    String(eventHostId) === String(currentUserId);

  const isPastEvent =
    selectedEvent &&
    new Date(selectedEvent.endAt || selectedEvent.startAt).getTime() <
      Date.now();

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2"
      >
        {events.map((event) => (
          <EventCardItem
            key={event._id}
            event={event}
            selected={event._id === selectedId}
            onClick={() => setSelectedId(event._id)}
          />
        ))}
      </motion.div>

      {selectedEvent && (
        <div
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedId(null);
            }
          }}
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <div className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            <EventDetailsLayout
              event={selectedEvent}
              myRSVP={myRSVP}
              onRsvp={handleRsvp}
              onCancel={handleCancel}
              onClose={() => setSelectedId(null)}
              onNavigate={handleNavigate}
              currentIndex={currentIndex}
              totalEvents={events.length}
              hideRegistration={isHost || isPastEvent}
            />
          </div>
        </div>
      )}
    </>
  );
}
