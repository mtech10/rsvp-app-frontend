import { Users, CheckCircle2, Clock3, XCircle, BarChart3 } from "lucide-react";
import AnalyticsChart from "./AnalyticsChart";
import RecentActivity from "./RecentActivity";

export default function AnalyticsPanel({ analytics }) {
  if (!analytics) return null;

  const cards = [
    {
      title: "Guests",
      value: analytics.totalGuests,
      subtitle: "Total registrations",
      icon: Users,
      bg: "bg-slate-50",
      border: "border-slate-200",
      iconColor: "text-slate-700",
    },
    {
      title: "Going",
      value: analytics.going,
      subtitle: "Confirmed attendees",
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-600",
    },
    {
      title: "Pending",
      value: analytics.pending,
      subtitle: "Awaiting approval",
      icon: Clock3,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      title: "Cancelled",
      value: analytics.cancelled,
      subtitle: "Registrations cancelled",
      icon: XCircle,
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-3">
        <div className="rounded-xl bg-slate-100 p-3">
          <BarChart3 className="text-slate-700" size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900">Event Analytics</h2>

          <p className="text-sm text-slate-500">
            Live performance of your event.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className={`${card.bg} ${card.border}
              rounded-2xl border p-6
              transition-all duration-300
              hover:-translate-y-1
              hover:shadow-lg`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  {card.title}
                </span>

                <Icon size={22} className={card.iconColor} />
              </div>

              <h3 className="text-4xl font-bold text-slate-900">
                {card.value}
              </h3>

              <p className="mt-2 text-sm text-slate-500">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      {analytics.capacity > 0 ? (
        <div className="mt-10">
          <div className="mb-3 flex justify-between text-sm font-medium">
            <span>Capacity</span>

            <span>
              {analytics.going} / {analytics.capacity}
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-700"
              style={{
                width: `${analytics.occupancy}%`,
              }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {analytics.occupancy}% occupied
          </p>
        </div>
      ) : (
        <div className="mt-10 rounded-xl bg-slate-50 p-5">
          <p className="font-medium text-slate-800">Unlimited Capacity</p>

          <p className="mt-1 text-sm text-slate-500">
            This event has no attendee limit.
          </p>
        </div>
      )}
      <div className="mt-8">
        <AnalyticsChart data={analytics.dailyRSVPs} />
      </div>

      <div className="mt-8">
        <RecentActivity data={analytics.recentRSVPs} />
      </div>
    </div>
  );
}
