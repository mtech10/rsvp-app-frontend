import React, { useEffect, useState, useMemo } from "react";
import { useRSVP } from "../context/RSVPContext";
import { formatDateParts } from "../utility/dateUtility";
import { MapPin } from "lucide-react";
import EventCardOpened from "./EventCardOpened";

const LandingPage = () => {
  const { rsvpEvents, cancelRsvp } = useRSVP();
  const [selectedId, setSelectedId] = useState(null);

  const selectedEvent = useMemo(
    () => rsvpEvents.find((event) => event.api_id === selectedId) || null,
    [rsvpEvents, selectedId],
  );

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

  const handleNavigate = (direction) => {
    const currentIndex = rsvpEvents.findIndex((e) => e.api_id === selectedId);
    const nextIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;

    if (rsvpEvents[nextIndex]) {
      setSelectedId(rsvpEvents[nextIndex].api_id);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-20 py-5">
      <div className="flex mb-8 items-center justify-between">
        <p className="text-2xl font-semibold text-slate-800">Events</p>

        <div className="p-2 bg-slate-200 font-semibold text-md text-slate-600 rounded-xl">
          <button className="p-1 rounded-xl mr-2">Upcoming</button>
          <button className="p-1 rounded-xl">Past</button>
        </div>
      </div>

      {rsvpEvents.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">
            Get started with your first RSVP
          </h2>
          <p className="mt-4 text-slate-600">
            Discover events, RSVP, and your saved events will appear here.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                Find events that match your interests.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">
                One-click RSVP keeps your schedule fresh.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 px-20">
          {rsvpEvents.map((event) => {
            const date = formatDateParts(event.start_at);
            const endDate = formatDateParts(event.end_at);
            const statusLabel =
              event.status === "pending"
                ? "Pending"
                : event.status === "going"
                  ? "Going"
                  : null;
            const badgeStyles =
              statusLabel === "Going"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700";
            return (
              <article
                key={event.api_id}
                className="flex gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
                onClick={() => setSelectedId(event.api_id)}
              >
                <div className="flex flex-col px-4 shrink-0">
                  <span className="text-base font-semibold text-slate-900">
                    {date.month} {date.day}
                  </span>
                  <span className="mt-1 text-sm  text-slate-600">
                    {date.weekday}
                  </span>
                </div>
                <div className="w-px bg-slate-300 self-stretch my-1"></div>
                <div className="flex flex-col gap-2 flex-1">
                  <span className=" text-lg font-semibold  text-slate-600">
                    {date.time}
                  </span>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold text-slate-900">
                      {event.name}
                    </h2>
                    {statusLabel ? (
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles}`}
                      >
                        {statusLabel}
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-2 text-sm text-slate-600">
                    {event.hosts[0]?.name}
                  </span>
                  <div className="flex gap-2 items-center">
                    <MapPin size={16} />
                    <p className="text-sm text-slate-600">{event.venue}</p>
                  </div>
                </div>
                <div className="relative overflow-hidden w-24 sm:w-32 shrink-0 rounded-2xl">
                  <img
                    src={event.cover_url}
                    alt={event.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>
      )}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 px-4 py-2 backdrop-blur-sm"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="relative flex h-full w-full max-w-2xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
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
