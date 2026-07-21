import { CheckCircle2, Clock3, XCircle } from "lucide-react";

export default function RecentActivity({ data }) {
  if (!data?.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Recent Activity</h3>

        <p className="mt-4 text-sm text-slate-500">No RSVP activity yet.</p>
      </div>
    );
  }

  const statusMap = {
    going: {
      icon: CheckCircle2,
      color: "text-green-600",
      label: "Approved",
    },

    pending: {
      icon: Clock3,
      color: "text-amber-600",
      label: "Pending Approval",
    },

    rejected: {
      icon: XCircle,
      color: "text-red-600",
      label: "Rejected",
    },

    cancelled: {
      icon: XCircle,
      color: "text-slate-600",
      label: "Cancelled",
    },
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold">Recent Activity</h3>

      <div className="space-y-4">
        {data.map((item) => {
          const config = statusMap[item.status];
          const Icon = config.icon;

          return (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full bg-slate-100 p-2 ${config.color}`}
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p className="font-medium">{item.user?.name}</p>

                  <p className="text-sm text-slate-500">{config.label}</p>
                </div>
              </div>

              <span className="text-xs text-slate-400">
                {new Date(item.updatedAt).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
