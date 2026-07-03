import React, { useEffect, useRef } from "react";

const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

export function formatTime12h(value24) {
  const [h, m] = value24.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

const TimeDropdown = ({ value, onSelect }) => {
  const selectedRef = useRef(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "center" });
  }, []);

  return (
    <div className="max-h-64 w-40 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
      {TIME_OPTIONS.map((time) => {
        const selected = time === value;
        return (
          <button
            type="button"
            key={time}
            ref={selected ? selectedRef : null}
            onClick={() => onSelect(time)}
            className={[
              "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
              selected
                ? "bg-indigo-600 font-semibold text-white"
                : "text-slate-700 hover:bg-slate-100",
            ].join(" ")}
          >
            {formatTime12h(time)}
          </button>
        );
      })}
    </div>
  );
};

export default TimeDropdown;
