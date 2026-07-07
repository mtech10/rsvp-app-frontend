import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Home,
  Calendar as CalendarIcon,
  Compass,
  Search as SearchIcon,
} from "lucide-react";
import { useRSVP } from "../context/RSVPContext";

const formatEventDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${month} ${day}, ${time}`;
};

const getBadgeDate = (dateString) => {
  if (!dateString) return { month: "EVT", day: "•" };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return { month: "EVT", day: "•" };

  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.getDate(),
  };
};

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");

  const { rsvpEvents = [] } = useRSVP();

  const [hostedEvents, setHostedEvents] = useState([]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);

      try {
        const storedHosted =
          JSON.parse(localStorage.getItem("userHostedEvents")) || [];
        setHostedEvents(storedHosted);
      } catch (err) {
        console.error("Failed to load hosted events:", err);
        setHostedEvents([]);
      }
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredHosted = hostedEvents.filter((ev) =>
    (ev.name || "").toLowerCase().includes(query.toLowerCase()),
  );

  const filteredAttending = rsvpEvents.filter((ev) =>
    (ev.name || "").toLowerCase().includes(query.toLowerCase()),
  );

  const handleAction = (path) => {
    onClose();
    navigate(path);
  };

  const handleEventClick = (event) => {
    onClose();
    navigate("/", { state: { openEvent: event } });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/40 pt-20 px-4 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-slate-100 px-4 py-3.5 gap-3 bg-white">
          <SearchIcon size={18} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for events, calendars and more..."
            className="w-full bg-transparent text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100">
          {!query.trim() && (
            <div className="pb-3">
              <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Shortcuts
              </p>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleAction("/create")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <Plus size={18} className="text-slate-600" />
                  Create Event
                </button>
                <button
                  onClick={() => handleAction("/")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <Home size={18} className="text-slate-600" />
                  Open Home
                </button>
                <button
                  onClick={() => handleAction("/calendars")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <CalendarIcon size={18} className="text-slate-600" />
                  Open Calendars
                </button>
                <button
                  onClick={() => handleAction("/discover")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-medium text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  <Compass size={18} className="text-slate-600" />
                  Open Discover
                </button>
              </div>
            </div>
          )}

          {(filteredHosted.length > 0 || !query.trim()) && (
            <div className="py-3">
              <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hosting
              </p>
              {filteredHosted.length === 0 ? (
                <p className="px-3 py-2 text-sm text-slate-400 italic">
                  No hosted events yet
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredHosted.map((ev, idx) => {
                    const badge = getBadgeDate(ev.startDate || ev.start_at);
                    return (
                      <button
                        key={ev.id || idx}
                        onClick={() => handleEventClick(ev)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-slate-100 transition-colors group"
                      >
                        <div className="flex flex-col items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white shrink-0 shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-400 leading-none">
                            {badge.month}
                          </span>
                          <span className="text-xs font-extrabold text-slate-800 leading-tight">
                            {badge.day}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 overflow-hidden">
                          <span className="font-semibold text-slate-800 truncate">
                            {ev.name}
                          </span>
                          <span className="text-xs text-slate-400 shrink-0">
                            {formatEventDate(ev.startDate || ev.start_at)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {(filteredAttending.length > 0 || !query.trim()) && (
            <div className="pt-3">
              <p className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Attending
              </p>
              {filteredAttending.length === 0 ? (
                <p className="px-3 py-2 text-sm text-slate-400 italic">
                  No RSVPs found
                </p>
              ) : (
                <div className="flex flex-col gap-1">
                  {filteredAttending.map((ev, idx) => {
                    const badge = getBadgeDate(ev.start_at || ev.startDate);
                    return (
                      <button
                        key={ev.id || idx}
                        onClick={() => handleEventClick(ev)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-slate-100 transition-colors group"
                      >
                        <div className="flex flex-col items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white shrink-0 shadow-2xs">
                          <span className="text-[9px] font-bold text-slate-400 leading-none">
                            {badge.month}
                          </span>
                          <span className="text-xs font-extrabold text-slate-800 leading-tight">
                            {badge.day}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2 overflow-hidden">
                          <span className="font-semibold text-slate-800 truncate">
                            {ev.name}
                          </span>
                          <span className="text-xs text-slate-400 shrink-0">
                            {formatEventDate(ev.start_at || ev.startDate)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
