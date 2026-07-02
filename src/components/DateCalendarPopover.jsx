import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  WEEKDAY_LABELS,
  MONTH_LABELS,
  getMonthGrid,
  isSameDay,
  startOfDay,
} from "../utility/calendarUtils";

const DateCalendarPopover = ({ value, onSelect, minDate = null }) => {
  const [viewDate, setViewDate] = useState(() => value || new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid = getMonthGrid(year, month);
  const today = startOfDay(new Date());
  const min = minDate ? startOfDay(minDate) : null;

  const goToPrevMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  return (
    <div className="w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
          aria-label="Previous month"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-semibold text-slate-900">
          {MONTH_LABELS[month]} {year}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100"
          aria-label="Next month"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div
        className="grid gap-y-1 text-center"
        style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
      >
        {WEEKDAY_LABELS.map((label) => (
          <span
            key={label}
            className="text-xs font-medium text-slate-400"
          >
            {label}
          </span>
        ))}

        {grid.map((date) => {
          const inCurrentMonth = date.getMonth() === month;
          const disabled = min && startOfDay(date) < min;
          const selected = isSameDay(date, value);
          const isToday = isSameDay(date, today);

          return (
            <button
              type="button"
              key={date.toISOString()}
              disabled={disabled}
              onClick={() => onSelect(date)}
              style={{ display: "flex" }}
              className={[
                "mx-auto h-8 w-8 items-center justify-center rounded-full text-sm transition",
                selected
                  ? "bg-indigo-600 font-semibold text-white"
                  : isToday
                    ? "font-semibold text-indigo-600 hover:bg-indigo-50"
                    : inCurrentMonth
                      ? "text-slate-700 hover:bg-slate-100"
                      : "text-slate-300 hover:bg-slate-50",
                disabled ? "cursor-not-allowed opacity-40 hover:bg-transparent" : "",
              ].join(" ")}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateCalendarPopover;
