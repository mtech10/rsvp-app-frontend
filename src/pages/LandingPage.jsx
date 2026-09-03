import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRSVP } from "../context/RSVPContext";
import { motion } from "framer-motion";

import EventCardItem from "../components/events/EventCardItem";
import EventCardOpened from "../components/events/EventDetailsLayout";
import EmptyState from "../components/ui/EmptyState";

const LandingPage = () => {
  const { rsvpEvents, cancelRsvp } = useRSVP();

  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const location = useLocation();
  const navigate = useNavigate();
  const [externalEvent, setExternalEvent] = useState(null);

  const selectedEvent = useMemo(() => {
    if (externalEvent) {
      const externalId =
        externalEvent._id || externalEvent.id || externalEvent.api_id;

      if (externalId === selectedId) {
        return externalEvent;
      }
    }

    return (
      rsvpEvents.find((event) => {
        const eventId = event._id || event.id || event.api_id;
        return eventId === selectedId;
      }) || null
    );
  }, [rsvpEvents, selectedId, externalEvent]);

  const filteredEvents = useMemo(() => {
    const now = new Date();

    return rsvpEvents.filter((event) => {
      const endAt = event.endAt || event.startAt;

      if (!endAt) {
        return activeTab === "upcoming";
      }

      const eventEnd = new Date(endAt);

      if (activeTab === "upcoming") {
        return eventEnd >= now;
      }

      return eventEnd < now;
    });
  }, [rsvpEvents, activeTab]);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  useEffect(() => {
    if (location.state?.openEvent) {
      const event = location.state.openEvent;

      setExternalEvent(event);
      setSelectedId(event.api_id || event.id);

      navigate(location.pathname, {
        replace: true,
        state: {},
      });
    }
  }, [location.state, location.pathname, navigate]);

  const handleNavigate = (direction) => {
    const currentIndex = rsvpEvents.findIndex((event) => {
      const eventId = event._id || event.id || event.api_id;
      return eventId === selectedId;
    });

    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (rsvpEvents[nextIndex]) {
      const nextEvent = rsvpEvents[nextIndex];
      setSelectedId(nextEvent._id || nextEvent.id || nextEvent.api_id);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-20 py-5">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <p className="text-2xl font-semibold text-slate-800">Events</p>

        <div className="flex rounded-xl bg-slate-100 p-1 ">
          <button
            type="button"
            onClick={() => setActiveTab("upcoming")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition ${
              activeTab === "upcoming"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Upcoming
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("past")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer transition ${
              activeTab === "past"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <EmptyState
          title={
            activeTab === "upcoming" ? "No upcoming events" : "No past events"
          }
          description={
            activeTab === "upcoming"
              ? "You haven't RSVP'd to any upcoming events yet."
              : "You don't have any past RSVP events yet."
          }
          actionText={activeTab === "upcoming" ? "Discover events" : undefined}
          actionTo={activeTab === "upcoming" ? "/discover" : undefined}
        />
      ) : (
        <motion.div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filteredEvents.map((event) => {
            const eventId = event._id || event.id || event.api_id;

            return (
              <EventCardItem
                key={eventId}
                event={event}
                selected={eventId === selectedId}
                onClick={() => setSelectedId(eventId)}
              />
            );
          })}
        </motion.div>
      )}

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 px-4 py-2 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <EventCardOpened
              event={selectedEvent}
              isRsvpView={true}
              onClose={() => setSelectedId(null)}
              onCancel={cancelRsvp}
              onNavigate={handleNavigate}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
