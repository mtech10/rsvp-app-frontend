import React, { useState } from "react";

/**
 * value: string
 * onDone: (nextValue: string) => void
 */
const DescriptionDropdown = ({ value, onDone }) => {
  const [draft, setDraft] = useState(value);

  return (
    <div className="w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
      <p className="mb-3 text-sm font-semibold text-slate-900">Description</p>

      <textarea
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Add a description for your event"
        rows={5}
        className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none"
      />

      <button
        type="button"
        onClick={() => onDone(draft)}
        className="mt-3 w-full rounded-xl bg-slate-900 py-2 text-sm font-semibold text-white transition hover:bg-black"
      >
        Done
      </button>
    </div>
  );
};

export default DescriptionDropdown;
