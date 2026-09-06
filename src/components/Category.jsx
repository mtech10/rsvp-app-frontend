import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { getCategories } from "../services/categoryService";
import { getEvents } from "../services/eventService";

import {
  Baby,
  BookOpen,
  Dices,
  Code2,
  Utensils,
  Sparkles,
  Activity,
  Palette,
  Leaf,
  Dumbbell,
  HeartPulse,
  Bitcoin,
  BriefcaseBusiness,
  GraduationCap,
  Music,
  Tag,
} from "lucide-react";

const categoryIcons = {
  Family: Baby,
  Books: BookOpen,
  Games: Dices,
  Tech: Code2,
  "Food & Drink": Utensils,
  AI: Sparkles,
  Running: Activity,
  "Arts & Culture": Palette,
  Climate: Leaf,
  Fitness: Dumbbell,
  Wellness: HeartPulse,
  Crypto: Bitcoin,
  Business: BriefcaseBusiness,
  Education: GraduationCap,
  Music,
};

const fallbackIcons = [
  Palette,
  BriefcaseBusiness,
  GraduationCap,
  Utensils,
  HeartPulse,
  Music,
  Dumbbell,
  Code2,
];

const getIcon = (name, index) =>
  categoryIcons[name] || fallbackIcons[index % fallbackIcons.length] || Tag;

const formatCount = (count) => {
  if (count >= 1000) {
    return `${Math.round(count / 1000)}K Events`;
  }

  return `${count} ${count === 1 ? "Event" : "Events"}`;
};

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        const [categoryData, eventData] = await Promise.all([
          getCategories(),
          getEvents(),
        ]);

        if (!mounted) return;

        setCategories(categoryData?.categories || []);
        setEvents(eventData?.events || []);
      } catch (error) {
        console.error("CATEGORY LOAD ERROR:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const eventCounts = useMemo(() => {
    const counts = {};

    events.forEach((event) => {
      if (!Array.isArray(event.categories)) return;

      event.categories.forEach((category) => {
        const categoryId =
          typeof category === "object" ? category?._id : category;

        if (!categoryId) return;

        counts[categoryId] = (counts[categoryId] || 0) + 1;
      });
    });

    return counts;
  }, [events]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="h-[92px] animate-pulse rounded-2xl border border-slate-100 bg-slate-50"
          />
        ))}
      </div>
    );
  }

  if (!categories.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center">
        <Tag size={30} strokeWidth={1.5} className="mx-auto text-slate-300" />

        <h3 className="mt-4 text-base font-medium text-slate-700">
          No categories available
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          Categories will appear here as events are added.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => {
        const Icon = getIcon(category.name, index);
        const count = eventCounts[category._id] || 0;

        return (
          <Link
            key={category._id}
            to={`/discover/category/${category._id}`}
            className="group flex min-h-15 items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-100">
              <Icon size={24} strokeWidth={1.7} className="text-slate-500" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[15px] font-medium text-slate-900">
                {category.name}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                {formatCount(count)}
              </p>
            </div>

            <span className="ml-auto -translate-x-1 text-lg text-slate-200 transition-all group-hover:translate-x-0 group-hover:text-slate-400">
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}
