import { useNavigate } from "react-router-dom";
import { Download, Pencil, Trash2 } from "lucide-react";

export default function OrganizerPanel({ event, onDelete, onExport }) {
  const navigate = useNavigate();

  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-slate-900">
        Organizer Actions
      </h2>

      <div className="space-y-3">
        <button
          onClick={() => navigate(`/my-events/${event._id}/edit`)}
          className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-left transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
        >
          <Pencil size={18} className="text-slate-600" />

          <div>
            <p className="font-medium text-slate-900">Edit Event</p>
            <p className="text-sm text-slate-500">
              Update event details, location and schedule.
            </p>
          </div>
        </button>

        <button
          onClick={onDelete}
          className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-4 py-3 text-left transition-all duration-200 hover:border-red-300 hover:bg-red-50"
        >
          <Trash2 size={18} className="text-red-600" />

          <div>
            <p className="font-medium text-red-600">Delete Event</p>
            <p className="text-sm text-slate-500">
              Permanently remove this event and all associated RSVPs.
            </p>
          </div>
        </button>

        <button
          onClick={onExport}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Download size={18} />
          Export Guests
        </button>
      </div>
    </div>
  );
}
