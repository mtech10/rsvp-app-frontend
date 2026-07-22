export default function OrganizerPanelSkeleton() {
  return (
    <div className="mt-10 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 h-6 w-44 rounded bg-slate-200" />

      <div className="space-y-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
          >
            <div className="h-10 w-10 rounded-xl bg-slate-200" />

            <div className="flex-1">
              <div className="h-4 w-36 rounded bg-slate-200" />

              <div className="mt-2 h-3 w-64 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
