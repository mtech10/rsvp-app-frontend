import React, { useState } from "react";

/**
 * value: number | null  (null = Unlimited)
 * onDone: (nextValue: number | null) => void
 */
const CapacityDropdown = ({ value, onDone }) => {
  const [limited, setLimited] = useState(value != null);
  const [count, setCount] = useState(value != null ? String(value) : "");

  const handleDone = () => {
    if (!limited) {
      onDone(null);
      return;
    }
    const parsed = Number(count);
    onDone(Number.isFinite(parsed) && parsed > 0 ? parsed : null);
  };

  return (
    <div className="w-64 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-3 text-sm font-semibold text-slate-900">Capacity</p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLimited(false)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            !limited ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          Unlimited
        </button>
        <button
          type="button"
          onClick={() => setLimited(true)}
          className={[
            "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition",
            limited ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600",
          ].join(" ")}
        >
          Limited
        </button>
      </div>

      {limited && (
        <input
          autoFocus
          type="number"
          min={1}
          value={count}
          onChange={(e) => setCount(e.target.value)}
          placeholder="e.g. 100"
          className="mt-3 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none"
        />
      )}

      <button
        type="button"
        onClick={handleDone}
        className="mt-4 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  );
};

export default CapacityDropdown;
