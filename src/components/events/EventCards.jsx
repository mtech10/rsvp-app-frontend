import React, { useEffect, useMemo, useState } from "react";
import EventDetailsLayout from "./EventDetailsLayout";
import EventCardItem from "./EventCardItem";
import { useRSVP } from "../../context/RSVPContext";

const EventCards = ({ category = null, showAll = false }) => {
  const { events = [] } = getEvents({
    limit: showAll ? 100 : 12,
    category,
  });
  const [selectedId, setSelectedId] = useState(null);
  const { addRsvp } = useRSVP();

  const selectedEvent = useMemo(
    () => events.find((event) => event.api_id === selectedId) || null,
    [events, selectedId],
  );

  const handleSelect = (id) => setSelectedId(id);
  const handleRsvp = (registrationData) => {
    if (registrationData) addRsvp(registrationData);
  };
  const handleClose = () => setSelectedId(null);

  const handleNavigate = (direction) => {
    const currentIndex = events.findIndex((e) => e.api_id === selectedId);
    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (events[nextIndex]) {
      setSelectedId(events[nextIndex].api_id);
    }
  };

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

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
        {events.map((event) => (
          <EventCardItem
            key={event.api_id}
            event={event}
            selected={event.api_id === selectedId}
            onClick={() => handleSelect(event.api_id)}
          />
        ))}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 px-4 py-2 backdrop-blur-sm sm:px-6 sm:py-3"
          onClick={handleClose}
        >
          <div
            className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-in slide-in-from-right-8 fade-in transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <EventCardOpened
              event={selectedEvent}
              onNavigate={handleNavigate}
              onRsvp={handleRsvp}
              onClose={handleClose}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EventCards;
