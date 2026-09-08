import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Home,
  Calendar as CalendarIcon,
  Compass,
  Search as SearchIcon,
  Loader2,
  CalendarDays,
} from "lucide-react";

import { useRSVP } from "../context/RSVPContext";
import { getEvents } from "../services/eventService";

const formatEventDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "";

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  });

  const day = date.getDate();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}, ${time}`;
};

const getBadgeDate = (dateString) => {
  if (!dateString) {
    return {
      month: "EVT",
      day: "•",
    };
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return {
      month: "EVT",
      day: "•",
    };
  }

  return {
    month: date
      .toLocaleDateString("en-US", {
        month: "short",
      })
      .toUpperCase(),
    day: date.getDate(),
  };
};

const getEventName = (event) =>
  event?.name || event?.title || event?.eventName || "Untitled event";

const getEventId = (event) => event?._id || event?.id;

const getEventDate = (event) =>
  event?.startAt || event?.start_at || event?.startDate;

export default function SearchModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { rsvpEvents = [] } = useRSVP();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hostedEvents, setHostedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);

    try {
      const storedHosted =
        JSON.parse(localStorage.getItem("userHostedEvents")) || [];

      setHostedEvents(Array.isArray(storedHosted) ? storedHosted : []);
    } catch (err) {
      console.error("FAILED TO LOAD HOSTED EVENTS:", err);
      setHostedEvents([]);
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  /*
   * GLOBAL EVENT SEARCH
   *
   * Searches the public events API whenever the user enters a query.
   * The request is debounced so we don't make an API request on every
   * individual keystroke.
   */
  useEffect(() => {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setSearchResults([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const data = await getEvents({
          search: trimmedQuery,
        });

        if (cancelled) return;

        const events = Array.isArray(data?.events) ? data.events : [];

        setSearchResults(events);
      } catch (error) {
        if (!cancelled) {
          console.error("GLOBAL SEARCH ERROR:", error);
          setSearchResults([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  if (!isOpen) return null;

  const trimmedQuery = query.trim().toLowerCase();

  const filteredHosted = hostedEvents.filter((event) =>
    getEventName(event).toLowerCase().includes(trimmedQuery),
  );

  const filteredAttending = rsvpEvents.filter((event) =>
    getEventName(event).toLowerCase().includes(trimmedQuery),
  );

  const handleAction = (path) => {
    onClose?.();
    navigate(path);
  };

  const handleEventClick = (event) => {
    const eventId = getEventId(event);

    if (!eventId) return;

    onClose?.();
    navigate(`/events/${eventId}`);
  };

  const renderEvent = (event, index) => {
    const eventId = getEventId(event);
    const eventDate = getEventDate(event);
    const badge = getBadgeDate(eventDate);

    return (
      <button
        key={eventId || index}
        type="button"
        onClick={() => handleEventClick(event)}
        className="
          flex
          w-full
          min-w-0
          items-center
          gap-3
          rounded-xl
          px-3
          py-2.5
          text-left
          transition-colors
          hover:bg-slate-100
        "
      >
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            flex-col
            items-center
            justify-center
            rounded-lg
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <span className="text-[9px] font-bold leading-none text-slate-400">
            {badge.month}
          </span>

          <span className="text-xs font-extrabold leading-tight text-slate-800">
            {badge.day}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-800">
            {getEventName(event)}
          </p>

          {eventDate && (
            <p className="truncate text-xs text-slate-400">
              {formatEventDate(eventDate)}
            </p>
          )}
        </div>

        <CalendarDays size={16} className="shrink-0 text-slate-300" />
      </button>
    );
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-start
        justify-center
        bg-slate-900/40
        px-4
        pt-20
        backdrop-blur-sm
        animate-in
        fade-in
        duration-150
      "
      onClick={onClose}
    >
      <div
        className="
          flex
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-slate-100
            bg-white
            px-4
            py-3.5
          "
        >
          {loading ? (
            <Loader2
              size={18}
              className="shrink-0 animate-spin text-indigo-500"
            />
          ) : (
            <SearchIcon size={18} className="shrink-0 text-slate-400" />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for events, calendars and more..."
            className="
              w-full
              min-w-0
              bg-transparent
              text-base
              text-slate-800
              outline-none
              placeholder:text-slate-400
            "
          />
        </div>

        {/* Results */}
        <div
          className="
            max-h-[60vh]
            overflow-x-hidden
            overflow-y-auto
            p-2
          "
        >
          {/* No search query */}
          {!trimmedQuery && (
            <div className="pb-3">
              <p
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Shortcuts
              </p>

              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleAction("/create")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    font-medium
                    text-slate-800
                    transition-colors
                    hover:bg-slate-100
                  "
                >
                  <Plus size={18} className="text-slate-600" />
                  Create Event
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("/")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    font-medium
                    text-slate-800
                    transition-colors
                    hover:bg-slate-100
                  "
                >
                  <Home size={18} className="text-slate-600" />
                  Open Home
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("/calendars")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    font-medium
                    text-slate-800
                    transition-colors
                    hover:bg-slate-100
                  "
                >
                  <CalendarIcon size={18} className="text-slate-600" />
                  Open Calendars
                </button>

                <button
                  type="button"
                  onClick={() => handleAction("/discover")}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-left
                    font-medium
                    text-slate-800
                    transition-colors
                    hover:bg-slate-100
                  "
                >
                  <Compass size={18} className="text-slate-600" />
                  Open Discover
                </button>
              </div>
            </div>
          )}

          {/* Global event results */}
          {trimmedQuery && (
            <div className="py-3">
              <p
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Events
              </p>

              {loading ? (
                <div className="px-3 py-6 text-center">
                  <Loader2
                    size={20}
                    className="
                      mx-auto
                      animate-spin
                      text-indigo-500
                    "
                  />

                  <p className="mt-2 text-sm text-slate-400">
                    Searching events...
                  </p>
                </div>
              ) : searchResults.length === 0 ? (
                <p className="px-3 py-4 text-sm italic text-slate-400">
                  No events found for "{query.trim()}"
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {searchResults.map(renderEvent)}
                </div>
              )}
            </div>
          )}

          {/* Hosting */}
          {trimmedQuery && (
            <div className="border-t border-slate-100 py-3">
              <p
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Hosting
              </p>

              {filteredHosted.length === 0 ? (
                <p className="px-3 py-2 text-sm italic text-slate-400">
                  No hosted events found
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredHosted.map(renderEvent)}
                </div>
              )}
            </div>
          )}

          {/* Attending */}
          {trimmedQuery && (
            <div className="border-t border-slate-100 pt-3">
              <p
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Attending
              </p>

              {filteredAttending.length === 0 ? (
                <p className="px-3 py-2 text-sm italic text-slate-400">
                  No RSVPs found
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredAttending.map(renderEvent)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
