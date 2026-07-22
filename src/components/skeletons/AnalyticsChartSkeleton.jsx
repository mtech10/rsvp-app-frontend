export default function AnalyticsChartSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-6 h-6 w-44 rounded bg-slate-200" />

      <div className="flex h-64 items-end gap-4">
        {[25, 60, 40, 80, 55, 70, 45].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-xl bg-slate-200"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
