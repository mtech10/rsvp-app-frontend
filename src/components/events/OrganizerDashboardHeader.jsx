import { CalendarDays, Plus } from "lucide-react";

export default function OrganizerDashboardHeader({
  totalEvents,
  onCreateEvent,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:flex-row lg:items-center">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
          Organizer Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">My Events</h1>

        <p className="mt-3 max-w-2xl text-slate-600">
          Manage your events, monitor registrations and track attendee activity
          from one place.
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* <div className="rounded-2xl bg-slate-100 px-6 py-4">
          <p className="text-sm text-slate-500">Total Events</p>

          <div className="mt-1 flex items-center gap-2">
            <CalendarDays size={20} />

            <span className="text-3xl font-bold">{totalEvents}</span>
          </div>
        </div> */}

        <button
          onClick={onCreateEvent}
          className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 font-semibold text-white transition hover:bg-black"
        >
          <Plus size={18} />
          Create Event
        </button>
      </div>
    </div>
  );
}
