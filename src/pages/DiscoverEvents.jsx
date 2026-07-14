import React, { useState } from "react";
import Category from "../components/Category";
import EventCards from "../components/events/EventCards";

const DiscoverEvents = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFullView, setIsFullView] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Popular Events
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Discover
          </h1>
        </div>
        <button
          onClick={() => setIsFullView(true)}
          className="inline-flex items-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          View All →
        </button>
      </div>
      <EventCards category={selectedCategory} showAll={isFullView} />

      {!isFullView && (
        <div className="mb-10 mt-10">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Browse by Category
          </h2>
          <Category
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>
      )}
    </section>
  );
};

export default DiscoverEvents;
