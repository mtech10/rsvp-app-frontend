import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { TIMEZONES, formatGmtOffset } from "../utility/timezones";

const TimezoneDropdown = ({ value, onSelect }) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null; // null = show "Popular Timezones" instead
    return TIMEZONES.filter((tz) => tz.label.toLowerCase().includes(q));
  }, [query]);

  const listToShow = results ?? TIMEZONES.filter((tz) => tz.popular);

  return (
    <div className="w-80 rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-4">
        <Search size={16} className="text-slate-400" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a timezone"
          className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
        />
      </div>

      <div className="max-h-48 overflow-y-auto p-4">
        {!results && (
          <p className="px-2 pb-1 pt-2 text-xs font-medium text-slate-400">
            Popular Timezones
          </p>
        )}

        {listToShow.length === 0 && (
          <p className="px-2 py-4 text-sm text-slate-400">No timezones found</p>
        )}

        {listToShow.map((tz) => {
          const selected = tz.id === value?.id;
          return (
            <button
              type="button"
              key={tz.id}
              onClick={() => onSelect(tz)}
              className={[
                "flex w-full items-center justify-between rounded-lg px-3 py-4 text-left transition",
                selected ? "bg-indigo-50" : "hover:bg-slate-50",
              ].join(" ")}
            >
              <span className="text-sm text-slate-800">{tz.label}</span>
              <span className="ml-3 shrink-0 text-xs text-slate-400">
                {formatGmtOffset(tz.offsetMinutes)}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimezoneDropdown;
