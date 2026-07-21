import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export default function StatusBadge({ status }) {
  switch (status) {
    case "going":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          <CheckCircle2 size={15} />
          Going
        </span>
      );

    case "pending":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          <Clock3 size={15} />
          Pending
        </span>
      );

    case "rejected":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          <XCircle size={15} />
          Rejected
        </span>
      );

    case "cancelled":
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
          <XCircle size={15} />
          Cancelled
        </span>
      );

    default:
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          Unknown
        </span>
      );
  }
}
