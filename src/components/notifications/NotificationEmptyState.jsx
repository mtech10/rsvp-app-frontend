import { Bell } from "lucide-react";

export default function NotificationEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <Bell size={42} className="mb-3 text-slate-300" />

      <h3 className="font-semibold text-slate-700">You're all caught up</h3>

      <p className="mt-2 text-center text-sm text-slate-500">
        New RSVP requests and updates will appear here.
      </p>
    </div>
  );
}
