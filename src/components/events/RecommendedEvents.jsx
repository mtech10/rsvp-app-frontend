import React from "react";
import EventCards from "./EventCards";

export default function RecommendedEvents({ events = [] }) {
  if (!events.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
          Recommended for you
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Events you might be interested in.
        </p>
      </div>

      <EventCards events={events} />
    </section>
  );
}
