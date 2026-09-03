import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export default function EmptyState({
  icon: Icon = CalendarDays,
  title,
  description,
  actionText,
  actionTo,
}) {
  return (
    <div className="flex min-h-110 flex-col items-center justify-center px-6 py-16 text-center">
      {/* Empty state illustration */}
      <div className="relative mb-10 h-36 w-36">
        <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
          <Icon size={62} strokeWidth={1.5} className="text-slate-200" />
        </div>

        {/* Event count */}
        <div className="absolute right-0 top-0 flex h-14 w-14 items-center justify-center rounded-2xl border border-white bg-white text-4xl font-medium text-slate-300 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
          0
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-medium text-slate-400">{title}</h2>

      {/* Description */}
      <p className="mt-4 max-w-md text-base text-slate-400">{description}</p>

      {/* Action */}
      {actionText && actionTo && (
        <Link
          to={actionTo}
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-5 py-2.5 text-base font-medium text-slate-500 shadow-sm transition hover:bg-slate-100"
        >
          <span className="text-xl leading-none">+</span>
          {actionText}
        </Link>
      )}
    </div>
  );
}
