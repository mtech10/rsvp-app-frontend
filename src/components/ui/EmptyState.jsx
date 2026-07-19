import { Link } from "react-router-dom";

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
      {Icon && (
        <div className="mb-6 rounded-full bg-slate-100 p-5">
          <Icon size={40} className="text-slate-400" />
        </div>
      )}

      <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>

      <p className="mt-3 max-w-md text-slate-500">{description}</p>

      {actionText && actionTo && (
        <Link
          to={actionTo}
          className="mt-8 rounded-xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
