import { Users, CheckCircle2, Clock3, XCircle, BarChart3 } from "lucide-react";
import AnalyticsChart from "./AnalyticsChart";
import RecentActivity from "./RecentActivity";
import AnalyticsPanelSkeleton from "../skeletons/AnalyticsPanelSkeleton";
import { DashboardSection, DashboardStatCard } from "../dashboard";

export default function AnalyticsPanel({
  analytics,
  loading,
  selectedFilter,
  onSelectFilter,
}) {
  if (loading) return <AnalyticsPanelSkeleton />;

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
      filter: "all",
    },
    {
      title: "Going",
      value: analytics.going,
      subtitle: "Confirmed attendees",
      icon: CheckCircle2,
      bg: "bg-green-50",
      border: "border-green-200",
      iconColor: "text-green-600",
      filter: "going",
    },
    {
      title: "Pending",
      value: analytics.pending,
      subtitle: "Awaiting approval",
      icon: Clock3,
      bg: "bg-amber-50",
      border: "border-amber-200",
      iconColor: "text-amber-600",
      filter: "pending",
    },
    {
      title: "Cancelled",
      value: analytics.cancelled,
      subtitle: "Registrations cancelled",
      icon: XCircle,
      bg: "bg-red-50",
      border: "border-red-200",
      iconColor: "text-red-600",
      filter: "cancelled",
    },
  ];

  return (
    <DashboardSection
      className="mt-8"
      title="Event Analytics"
      description="Live performance of your event."
      icon={BarChart3}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardStatCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            iconColor={card.iconColor}
            bg={card.bg}
            border={card.border}
            active={selectedFilter === card.filter}
            onClick={() => onSelectFilter(card.filter)}
          />
        ))}
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
      <div className="mt-10">
        <AnalyticsChart data={analytics.dailyRSVPs} />
      </div>

      <div className="mt-10">
        <RecentActivity data={analytics.recentRSVPs} />
      </div>
    </DashboardSection>
  );
}
