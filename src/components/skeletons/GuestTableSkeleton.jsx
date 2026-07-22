export default function GuestTableSkeleton({ rows = 6 }) {
  return (
    <div className="mt-8 animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <div className="h-6 w-44 rounded bg-slate-200" />

          <div className="mt-2 h-4 w-56 rounded bg-slate-200" />
        </div>

        <div className="h-10 w-40 rounded-xl bg-slate-200" />
      </div>

      {/* Table */}
      <div className="divide-y divide-slate-100">
        {Array.from({ length: rows }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-6 py-5"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-200" />

              <div>
                <div className="h-4 w-40 rounded bg-slate-200" />

                <div className="mt-2 h-3 w-56 rounded bg-slate-200" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="h-8 w-24 rounded-full bg-slate-200" />

              <div className="h-10 w-20 rounded-xl bg-slate-200" />

              <div className="h-10 w-20 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
