import { useEffect, useMemo, useState } from "react";

import EventCardItem from "./EventCardItem";
import EventDetailsLayout from "./EventDetailsLayout";

import { getEvents } from "../../services/eventService";
import { createRSVP, cancelRSVP, getMyRSVP } from "../../services/rsvpService";

import toast from "react-hot-toast";

export default function EventCards({ category = null, showAll = false }) {
  const [events, setEvents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myRSVP, setMyRSVP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();

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
  }, [category, showAll]);

  useEffect(() => {
    if (!selectedId) {
      setSelectedEvent(null);
      setMyRSVP(null);
      return;
    }

    async function loadSelectedEvent() {
      try {
        const event = events.find((e) => e._id === selectedId);

        setSelectedEvent(event);

        try {
          const rsvp = await getMyRSVP(selectedId);
          setMyRSVP(rsvp.rsvp);
        } catch {
          setMyRSVP(null);
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadSelectedEvent();
  }, [selectedId, events]);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  const currentIndex = useMemo(
    () => events.findIndex((e) => e._id === selectedId),
    [events, selectedId],
  );

  const handleNavigate = (direction) => {
    if (direction === "next" && currentIndex < events.length - 1) {
      setSelectedId(events[currentIndex + 1]._id);
    }

    if (direction === "previous" && currentIndex > 0) {
      setSelectedId(events[currentIndex - 1]._id);
    }
  };

  const handleRsvp = async (tickets = 1) => {
    try {
      await createRSVP(selectedId, tickets);

      const rsvp = await getMyRSVP(selectedId);

      setMyRSVP(rsvp.rsvp);
    } catch (error) {
      toast.error(err.message);
    }
  };

  const handleCancel = async () => {
    try {
      await cancelRSVP(selectedId);

      setMyRSVP(null);
    } catch (error) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return <h2>Loading events...</h2>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {events.map((event) => (
          <EventCardItem
            key={event._id}
            event={event}
            selected={event._id === selectedId}
            onClick={() => setSelectedId(event._id)}
          />
        ))}
      </div>

      {selectedEvent && (
        <div
          onClick={() => setSelectedId(null)}
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl"
          >
            <EventDetailsLayout
              event={selectedEvent}
              myRSVP={myRSVP}
              onRsvp={handleRsvp}
              onCancel={handleCancel}
              onClose={() => setSelectedId(null)}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      )}
    </>
  );
}
