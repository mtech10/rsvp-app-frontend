// src/pages/HomePage.jsx
// PUBLIC HOME PAGE
// Route: /home
// This page does not require authentication.

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  Baby,
  Bitcoin,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Compass,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Leaf,
  Music2,
  Palette,
  Plus,
  Sparkles,
  Utensils,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

import { getEvents } from "../services/eventService";
import { getCategories } from "../services/categoryService";

const heroWords = ["meaningful", "memorable", "exciting", "unforgettable"];

const getEventId = (event) => event?._id || event?.id || event?.api_id;

const getEventName = (event) =>
  event?.name || event?.title || event?.eventName || "Untitled event";

const getEventStart = (event) =>
  event?.startAt || event?.start_at || event?.startDate;

const formatEventDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

const getEventImage = (event) => {
  const image =
    event?.image ||
    event?.coverImage ||
    event?.imageUrl ||
    event?.coverImageUrl ||
    event?.eventImage ||
    event?.eventImageUrl ||
    event?.bannerImage ||
    event?.bannerImageUrl ||
    event?.cover ||
    event?.thumbnail ||
    event?.photo;

  if (typeof image === "string" && image.trim()) {
    return image;
  }

  if (image && typeof image === "object") {
    return (
      image?.url ||
      image?.secure_url ||
      image?.src ||
      image?.path ||
      image?.location ||
      ""
    );
  }

  return "";
};

const categoryIcons = {
  AI: Sparkles,
  "Arts & Culture": Palette,
  Business: BriefcaseBusiness,
  Climate: Leaf,
  Crypto: Bitcoin,
  Education: GraduationCap,
  Family: Baby,
  Fitness: Dumbbell,
  "Food & Drink": Utensils,
  Games: Gamepad2,
  Music: Music2,
  Running: Activity,
  Tech: Code2,
  Wellness: HeartPulse,
};

const getCategoryEventCount = (category) =>
  Number(
    category?.eventCount ??
      category?.eventsCount ??
      category?.events?.length ??
      0,
  );

const getCategoryIcon = (category) => {
  const Icon = categoryIcons[category?.name] || Compass;
  return Icon;
};

export default function HomePage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);

        const data = await getEvents({
          date: "upcoming",
        });

        setEvents(Array.isArray(data?.events) ? data.events.slice(0, 6) : []);
      } catch (error) {
        console.error("PUBLIC HOME EVENTS ERROR:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();

        const fetchedCategories = Array.isArray(data?.categories)
          ? data.categories.filter((category) => category?.name)
          : [];

        const sortedCategories = [...fetchedCategories]
          .sort((a, b) => {
            const countDifference =
              getCategoryEventCount(b) - getCategoryEventCount(a);

            if (countDifference !== 0) {
              return countDifference;
            }

            return a.name.localeCompare(b.name);
          })
          .slice(0, 12);

        setCategories(sortedCategories);
      } catch (error) {
        console.error("PUBLIC HOME CATEGORIES ERROR:", error);
        setCategories([]);
      }
    }

    loadCategories();
  }, []);

  const handleCreateEvent = () => {
    navigate("/register?returnTo=/create");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-950">
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-220px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-100/60 blur-3xl" />

          <div className="absolute right-[-150px] top-[350px] h-[350px] w-[350px] rounded-full bg-violet-100/40 blur-3xl" />

          <div className="absolute left-[-150px] top-[550px] h-[300px] w-[300px] rounded-full bg-fuchsia-100/30 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-10 pt-10 sm:px-8 sm:pb-10 sm:pt-10 lg:px-12">
          <div className="mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="
                mx-auto
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-slate-200
                bg-white
                px-4
                py-2
                text-sm
                font-medium
                text-slate-600
                shadow-sm
              "
            >
              <Sparkles size={15} className="text-indigo-500" />
              Discover. Create. Connect.
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="
                px-4
                text-5xl
                font-semibold
                leading-[0.98]
                tracking-[-0.055em]
                text-slate-950
                sm:px-8
                sm:text-6xl
                md:text-7xl
                lg:px-10
                lg:text-[88px]
              "
            >
              Bring people
              <br />
              <span className="inline-flex min-h-[1em] items-center">
                <motion.span
                  key={heroWords[heroIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="
                    bg-gradient-to-r
                    from-indigo-600
                    via-violet-600
                    to-fuchsia-600
                    bg-clip-text
                    text-transparent
                  "
                >
                  {heroWords[heroIndex]}
                </motion.span>
              </span>
              <br />
              experiences together.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.5,
              }}
              className="
                mx-auto
                mt-7
                max-w-2xl
                px-4
                text-lg
                leading-8
                text-slate-500
                sm:px-8
                sm:text-xl
              "
            >
              Discover events, create experiences, and connect with people who
              share what matters to you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.5,
              }}
              className="
                mt-9
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <button
                type="button"
                onClick={handleCreateEvent}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-slate-950
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-xl
                  shadow-slate-950/10
                  transition
                  hover:-translate-y-0.5
                  hover:bg-slate-800
                "
              >
                Create an event
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => navigate("/discover")}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  px-7
                  py-3.5
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  transition
                  hover:-translate-y-0.5
                  hover:border-slate-300
                  hover:bg-slate-50
                "
              >
                <Compass size={17} />
                Discover events
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
            }}
            className="relative mx-auto mt-20 max-w-6xl"
          >
            <div className="relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950">
                    <Sparkles size={15} className="text-white" />
                  </div>

                  <span className="font-bold text-slate-800">
                    Browse by Category
                  </span>
                </div>
              </div>

              {categories.length > 0 && (
                <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3 sm:p-7 md:grid-cols-4">
                  {categories.map((category, index) => {
                    const Icon = getCategoryIcon(category);

                    const eventCount = getCategoryEventCount(category);

                    return (
                      <motion.button
                        key={category._id}
                        type="button"
                        onClick={() =>
                          navigate(`/discover/category/${category._id}`)
                        }
                        initial={{
                          opacity: 0,
                          y: 12,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.45 + index * 0.06,
                          duration: 0.35,
                        }}
                        className="
                            group
                            flex
                            min-h-[145px]
                            flex-col
                            overflow-hidden
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            text-left
                            shadow-sm
                            transition
                            duration-200
                            hover:-translate-y-1
                            hover:border-indigo-200
                            hover:shadow-lg
                          "
                      >
                        <div
                          className="
                              flex
                              flex-1
                              flex-col
                              bg-gradient-to-br
                              from-indigo-100
                              via-violet-100
                              to-fuchsia-100
                              p-4
                              transition
                              duration-200
                              group-hover:from-indigo-200
                              group-hover:via-violet-200
                              group-hover:to-fuchsia-200
                            "
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 shadow-sm">
                              <Icon
                                size={20}
                                strokeWidth={1.8}
                                className="text-slate-700"
                              />
                            </div>

                            <ArrowRight
                              size={16}
                              className="
                                  text-slate-400
                                  transition
                                  duration-200
                                  group-hover:translate-x-1
                                  group-hover:text-indigo-600
                                "
                            />
                          </div>

                          <div className="mt-auto pt-8">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {eventCount}{" "}
                              {eventCount === 1 ? "Event" : "Events"}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/70">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              From idea to experience.
            </h2>

            <p className="mt-4 text-slate-500">
              Everything you need to discover and create events people actually
              want to attend.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                icon: Compass,
                title: "Discover",
                description:
                  "Find events, communities, and experiences that match your interests.",
              },
              {
                icon: Plus,
                title: "Create",
                description:
                  "Create beautiful events, manage registrations, and bring your idea to life.",
              },
              {
                icon: Users,
                title: "Connect",
                description:
                  "Build communities and give people a reason to come together.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                  className="
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    p-7
                    shadow-sm
                  "
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <Icon size={21} className="text-slate-700" />
                  </div>

                  <h3 className="mt-6 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-12">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                What's happening
              </p>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                Explore upcoming events.
              </h2>

              <p className="mt-3 max-w-xl text-slate-500">
                You can explore what's happening before creating an account.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/discover")}
              className="
                inline-flex
                w-fit
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-700
                transition
                hover:text-indigo-600
              "
            >
              View all
              <ArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="
                    h-64
                    animate-pulse
                    rounded-2xl
                    bg-slate-100
                  "
                />
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <motion.button
                  key={getEventId(event)}
                  type="button"
                  onClick={() => navigate(`/events/${getEventId(event)}`)}
                  whileHover={{ y: -4 }}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    text-left
                    shadow-sm
                    transition
                    hover:shadow-xl
                  "
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-indigo-100 via-violet-100 to-fuchsia-100">
                    {getEventImage(event) ? (
                      <img
                        src={getEventImage(event)}
                        alt={getEventName(event)}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-300
                          group-hover:scale-105
                        "
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <CalendarDays size={36} className="text-slate-500/60" />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium text-indigo-500">
                      {formatEventDate(getEventStart(event))}
                    </p>

                    <h3 className="mt-2 truncate text-lg font-semibold text-slate-900">
                      {getEventName(event)}
                    </h3>

                    <p className="mt-2 truncate text-sm text-slate-400">
                      {event.locationType === "online"
                        ? "Online"
                        : event.venue ||
                          event.city ||
                          event.address ||
                          "Location coming soon"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center">
              <CalendarDays size={34} className="mx-auto text-slate-300" />

              <h3 className="mt-4 text-lg font-semibold text-slate-800">
                Something exciting is coming.
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Create the first experience that people can discover here.
              </p>

              <button
                type="button"
                onClick={handleCreateEvent}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-slate-950
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-slate-800
                "
              >
                Create an event
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Sparkles size={22} className="text-indigo-300" />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Your next event
            <span className="block text-indigo-300">starts here.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-400">
            Whether you're hosting a small gathering or building a community,
            give people something worth showing up for.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleCreateEvent}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white
                px-7
                py-3.5
                text-sm
                font-semibold
                text-slate-950
                transition
                hover:-translate-y-0.5
                hover:bg-slate-100
              "
            >
              Create your first event
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/discover")}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/15
                px-7
                py-3.5
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-white/10
              "
            >
              Discover events
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
