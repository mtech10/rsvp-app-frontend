import { SearchX } from "lucide-react";

export default function CategoryEmptyState({ onClear }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-3xl border border-slate-100 bg-slate-50/50 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm">
        <SearchX size={30} strokeWidth={1.5} className="text-slate-300" />
      </div>

      <h3 className="mt-6 text-xl font-medium tracking-tight text-slate-700">
        No events in this category yet
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
        There aren't any upcoming events here right now. Try another category or
        explore all upcoming events.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-7 rounded-xl bg-white px-5 py-2.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-900"
      >
        Explore all events
      </button>
    </div>
  );
}
