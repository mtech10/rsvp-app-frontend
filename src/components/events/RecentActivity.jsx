import { CheckCircle2, Clock3, XCircle, Activity } from "lucide-react";

import { DashboardSection, DashboardEmptyState } from "../dashboard";

export default function RecentActivity({ data }) {
  if (!data?.length) {
    return (
      <DashboardEmptyState
        icon={Activity}
        title="No Recent Activity"
        description="Guest registrations and updates will appear here."
      />
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
    <DashboardSection
      title="Recent Activity"
      description="Latest RSVP updates from your guests."
      icon={Activity}
    >
      <div className="space-y-4">
        {data.map((item) => {
          const config = statusMap[item.status];
          const Icon = config.icon;

          return (
            <div
              key={item._id}
              className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full bg-slate-100 p-2 ${config.color}`}
                >
                  <Icon size={18} />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    {item.user?.name}
                  </p>
                  <p className="text-sm text-slate-500">{config.label}</p>
                </div>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                {" "}
                {new Date(item.updatedAt).toLocaleDateString()}
              </span>
            </div>
          );
        })}
      </div>
    </DashboardSection>
  );
}
