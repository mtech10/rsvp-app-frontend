export default function EventCardSkeleton() {
  return (
    <div className="flex min-h-44 w-full animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="w-32 shrink-0 bg-slate-200" />

      <div className="flex flex-1 flex-col justify-center p-5">
        <div className="h-3 w-40 rounded bg-slate-200" />

        <div className="mt-3 h-6 w-3/4 rounded bg-slate-200" />

        <div className="mt-3 h-4 w-full rounded bg-slate-200" />

        <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />
      </div>
    </div>
  );
}
