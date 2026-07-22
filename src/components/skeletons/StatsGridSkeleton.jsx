export default function StatsGridSkeleton({ count = 4 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="h-4 w-24 rounded bg-slate-200" />

              <div className="mt-4 h-9 w-14 rounded bg-slate-200" />
            </div>

            <div className="h-12 w-12 rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
