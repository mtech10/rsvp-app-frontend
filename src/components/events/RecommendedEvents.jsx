import { useEffect, useState } from "react";

import EventCardItem from "./EventCardItem";

import { getRecommendedEvents } from "../../services/recommendationService";

export default function RecommendedEvents() {
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadRecommendations() {
      try {
        const data = await getRecommendedEvents();

        if (mounted) {
          setEvents(data?.events || []);
        }
      } catch (error) {
        console.error("RECOMMENDATIONS ERROR:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {Array.from({
          length: 2,
        }).map((_, index) => (
          <div
            key={index}
            className="h-[300px] animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="mb-6">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Curated for you
        </span>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
          Recommended for you
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Events based on your interests and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {events.map((event) => (
          <EventCardItem key={event._id} event={event} />
        ))}
      </div>
    </section>
  );
}
