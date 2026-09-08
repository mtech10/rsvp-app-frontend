import { useEffect, useMemo, useState } from "react";
import useRequireAuth from "../hooks/useRequireAuth";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bell,
  BellOff,
  Search,
  CalendarDays,
  SlidersHorizontal,
  MapPin,
  X,
} from "lucide-react";

import {
  getCategories,
  getFollowedCategories,
  followCategory,
  unfollowCategory,
} from "../services/categoryService";

import { getEvents, getNearbyEvents } from "../services/eventService";

import EventCardItem from "../components/events/EventCardItem";
import EventDetailsLayout from "../components/events/EventDetailsLayout";

import { useRSVP } from "../context/RSVPContext";
import { useAuth } from "../context/AuthContext";

import { createRSVP, cancelRSVP, getMyRSVP } from "../services/rsvpService";

import toast from "react-hot-toast";

export default function CategoryPage() {
  const { categoryId } = useParams();

  const { user } = useAuth();
  const { requireAuth } = useRequireAuth();

  const { addRsvp, cancelRsvp: removeRsvp } = useRSVP();

  const [category, setCategory] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(true);

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  const [showFilters, setShowFilters] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [myRSVP, setMyRSVP] = useState(null);

  useEffect(() => {
    if (!categoryId) {
      setCategory(null);
      setCategoryLoading(false);
      return;
    }

    let mounted = true;

    async function loadCategory() {
      try {
        setCategoryLoading(true);

        const data = await getCategories();

        const categories = data?.categories || [];

        const found = categories.find(
          (item) => String(item._id) === String(categoryId),
        );

        if (mounted) {
          setCategory(found || null);
        }
      } catch (error) {
        console.error("CATEGORY PAGE ERROR:", error);

        if (mounted) {
          setCategory(null);
        }
      } finally {
        if (mounted) {
          setCategoryLoading(false);
        }
      }
    }

    loadCategory();

    return () => {
      mounted = false;
    };
  }, [categoryId]);

  useEffect(() => {
    if (!categoryId || !user) {
      setIsFollowing(false);
      return;
    }

    let mounted = true;

    async function loadFollowedCategories() {
      try {
        const data = await getFollowedCategories();

        const followed = data?.categories || [];

        if (mounted) {
          setIsFollowing(
            followed.some((item) => String(item._id) === String(categoryId)),
          );
        }
      } catch (error) {
        console.error("FOLLOWED CATEGORIES ERROR:", error);

        if (mounted) {
          setIsFollowing(false);
        }
      }
    }

    loadFollowedCategories();

    return () => {
      mounted = false;
    };
  }, [categoryId, user]);

  useEffect(() => {
    if (!categoryId) return;

    let mounted = true;

    async function loadEvents() {
      try {
        setLoading(true);

        let data;

        if (locationFilter === "near_me" && userLocation) {
          data = await getNearbyEvents({
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            category: categoryId,
            search,
          });
        } else {
          data = await getEvents({
            category: categoryId,
            date: dateFilter === "all" ? undefined : dateFilter,
            location: locationFilter === "online" ? "online" : undefined,
            search,
          });
        }

        if (mounted) {
          setEvents(data?.events || []);
        }
      } catch (error) {
        console.error("CATEGORY EVENTS ERROR:", error);

        if (mounted) {
          setEvents([]);
          toast.error(error.message || "Failed to load events.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      mounted = false;
    };
  }, [categoryId, dateFilter, locationFilter, search, userLocation]);

  const requestUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Location services are not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        setLocationFilter("near_me");
        setLocationLoading(false);
      },
      () => {
        setLocationLoading(false);

        toast.error("Please allow location access to find events near you.");

        setLocationFilter("all");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  };

  const handleLocationChange = (value) => {
    if (value === "near_me") {
      if (userLocation) {
        setLocationFilter("near_me");
        return;
      }

      requestUserLocation();
      return;
    }

    setLocationFilter(value);

    if (value !== "near_me") {
      setUserLocation(null);
    }
  };

  const handleClearFilters = () => {
    setDateFilter("all");
    setLocationFilter("all");
    setUserLocation(null);
  };

  const hasActiveFilters = dateFilter !== "all" || locationFilter !== "all";

  useEffect(() => {
    if (!selectedId) {
      setSelectedEvent(null);
      setMyRSVP(null);
      return;
    }

    const event = events.find(
      (item) => String(item._id) === String(selectedId),
    );

    if (!event) {
      setSelectedEvent(null);
      setMyRSVP(null);
      return;
    }

    setSelectedEvent(event);
    setMyRSVP(null);

    if (!user) {
      return;
    }

    let active = true;

    async function loadRSVP() {
      try {
        const response = await getMyRSVP(selectedId);

        if (active) {
          setMyRSVP(response?.rsvp || null);
        }
      } catch {
        if (active) {
          setMyRSVP(null);
        }
      }
    }

    loadRSVP();

    return () => {
      active = false;
    };
  }, [selectedId, events, user]);

  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  const currentIndex = useMemo(
    () => events.findIndex((event) => String(event._id) === String(selectedId)),
    [events, selectedId],
  );

  const handleFollowCategory = async () => {
    if (!requireAuth()) return;

    try {
      if (isFollowing) {
        await unfollowCategory(categoryId);
        setIsFollowing(false);
      } else {
        await followCategory(categoryId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("CATEGORY FOLLOW ERROR:", error);
      toast.error(error.message || "Failed to update category follow status.");
    }
  };

  const handleNavigate = (direction) => {
    if (currentIndex === -1) return;

    if (direction === "next" && currentIndex < events.length - 1) {
      setSelectedId(events[currentIndex + 1]._id);
      return;
    }

    if (direction === "prev" && currentIndex > 0) {
      setSelectedId(events[currentIndex - 1]._id);
    }
  };

  const eventHostId =
    typeof selectedEvent?.host === "object"
      ? selectedEvent?.host?._id || selectedEvent?.host?.id
      : selectedEvent?.host;

  const currentUserId = user?._id || user?.id;

  const isHost =
    Boolean(eventHostId) &&
    Boolean(currentUserId) &&
    String(eventHostId) === String(currentUserId);

  const handleRsvp = async (tickets = 1) => {
    if (!requireAuth()) return;

    try {
      await createRSVP(selectedId, tickets);

      const response = await getMyRSVP(selectedId);

      setMyRSVP(response?.rsvp || null);

      addRsvp(selectedEvent, response?.rsvp);

      toast.success(
        selectedEvent?.requireApproval
          ? "Registration request submitted successfully."
          : "RSVP confirmed successfully.",
      );
    } catch (error) {
      console.error("RSVP ERROR:", error);

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
      console.error("CANCEL RSVP ERROR:", error);

      toast.error(error.message || "Failed to cancel registration.");
    }
  };

  if (categoryLoading) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-100" />
          <div className="mt-8 h-12 w-64 rounded bg-slate-100" />
          <div className="mt-4 h-5 w-96 max-w-full rounded bg-slate-100" />
        </div>
      </section>
    );
  }

  if (!category) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Category not found
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          The category could not be loaded.
        </p>

        <Link
          to="/discover"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <ArrowLeft size={16} />
          Back to Discover
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <Link
        to="/discover"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-slate-700"
      >
        <ArrowLeft size={16} />
        Discover
      </Link>

      <div className="mt-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 via-white to-white px-6 py-10 sm:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
              Discover category
            </span>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {category.name}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              {category.description ||
                `Discover upcoming ${category.name.toLowerCase()} events and experiences.`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleFollowCategory}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
              isFollowing
                ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isFollowing ? (
              <>
                <BellOff size={16} />
                Following
              </>
            ) : (
              <>
                <Bell size={16} />
                Follow category
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-5 text-sm font-medium transition ${
              showFilters || hasActiveFilters
                ? "border-slate-300 bg-slate-100 text-slate-900"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <SlidersHorizontal size={18} />
            Filter
            {hasActiveFilters && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1.5 text-[11px] font-semibold text-white">
                {(dateFilter !== "all" ? 1 : 0) +
                  (locationFilter !== "all" ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="absolute right-0 top-16 z-30 w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:w-[360px]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Filter events
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Narrow down events by date or location.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close filters"
              >
                <X size={17} />
              </button>
            </div>

            <div className="mt-5 space-y-5">
              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="all">All dates</option>
                    <option value="today">Today</option>
                    <option value="week">This week</option>
                    <option value="weekend">This weekend</option>
                    <option value="month">This month</option>
                  </select>

                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                  Location
                </label>

                <div className="relative">
                  <MapPin
                    size={17}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={locationFilter}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    className="h-11 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-9 text-sm font-medium text-slate-700 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-slate-100"
                  >
                    <option value="all">All locations</option>
                    <option value="online">Online</option>
                    <option value="near_me">
                      {locationLoading ? "Finding nearby events..." : "Near me"}
                    </option>
                  </select>

                  <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    ▾
                  </span>
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="mt-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
            Events
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Events in {category.name}.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[300px] animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        ) : !events.length ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-16 text-center">
            <h3 className="text-lg font-medium text-slate-700">
              No events found
            </h3>

            <p className="mt-2 text-sm text-slate-400">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {events.map((event) => (
              <EventCardItem
                key={event._id}
                event={event}
                onClick={() => setSelectedId(event._id)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-[100] flex justify-end bg-slate-950/35 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedId(null);
            }
          }}
        >
          <div className="flex h-full w-full max-w-2xl flex-col bg-white shadow-2xl">
            <EventDetailsLayout
              key={selectedEvent._id}
              event={selectedEvent}
              mode="public"
              onClose={() => setSelectedId(null)}
              onNavigate={handleNavigate}
              currentIndex={currentIndex}
              totalEvents={events.length}
              myRSVP={myRSVP}
              onRsvp={handleRsvp}
              onCancel={handleCancel}
              hideRegistration={isHost}
            />
          </div>
        </div>
      )}
    </section>
  );
}
