export default function RecentActivitySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-6 h-6 w-48 rounded bg-slate-200" />

      <div className="space-y-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-200" />

              <div>
                <div className="h-4 w-40 rounded bg-slate-200" />

                <div className="mt-2 h-3 w-24 rounded bg-slate-200" />
              </div>
            </div>

            <div className="h-8 w-20 rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
