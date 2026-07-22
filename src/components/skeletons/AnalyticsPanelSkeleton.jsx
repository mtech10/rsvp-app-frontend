import StatsGridSkeleton from "./StatsGridSkeleton";
import AnalyticsChartSkeleton from "./AnalyticsChartSkeleton";
import RecentActivitySkeleton from "./RecentActivitySkeleton";

export default function AnalyticsPanelSkeleton() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm animate-pulse">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-slate-200" />

        <div>
          <div className="h-6 w-52 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-64 rounded bg-slate-200" />
        </div>
      </div>

      <StatsGridSkeleton />

      <div className="mt-10">
        <div className="mb-3 h-4 w-40 rounded bg-slate-200" />

        <div className="h-3 rounded-full bg-slate-200" />

        <div className="mt-3 h-4 w-28 rounded bg-slate-200" />
      </div>

      <div className="mt-8">
        <AnalyticsChartSkeleton />
      </div>

      <div className="mt-8">
        <RecentActivitySkeleton />
      </div>
    </div>
  );
}
