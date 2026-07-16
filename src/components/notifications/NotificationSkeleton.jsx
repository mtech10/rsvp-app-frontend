export default function NotificationSkeleton() {
  return (
    <div className="animate-pulse border-b p-4">
      <div className="flex gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-200" />

        <div className="flex-1">
          <div className="mb-2 h-4 w-40 rounded bg-slate-200" />

          <div className="mb-2 h-3 w-full rounded bg-slate-200" />

          <div className="h-3 w-2/3 rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
