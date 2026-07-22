export default function CreateEventSkeleton() {
  return (
    <section className="mx-auto max-w-4xl animate-pulse px-6 py-10">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-36 rounded-full bg-slate-200" />
        <div className="h-8 w-20 rounded-full bg-slate-200" />
      </div>

      <div className="flex flex-col gap-8 sm:flex-row">
        <div className="aspect-square w-full shrink-0 rounded-2xl bg-slate-200 sm:w-72" />

        <div className="min-w-0 flex-1">
          <div className="h-10 w-3/4 rounded bg-slate-200" />

          <div className="mt-6 flex flex-col gap-2 md:flex-row">
            <div className="flex-1 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white/60">
              {[1, 2].map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-slate-200" />
                  <div className="h-4 w-9 rounded bg-slate-200" />
                  <div className="h-6 flex-1 rounded bg-slate-200" />
                  <div className="h-6 w-12 rounded bg-slate-200" />
                </div>
              ))}
            </div>

            <div className="h-20 w-full rounded-2xl border border-slate-200 bg-slate-100 md:w-32" />
          </div>

          <div className="mt-3 h-16 rounded-2xl bg-indigo-100/60" />
          <div className="mt-3 h-14 rounded-2xl bg-slate-100" />

          <div className="mt-6 h-4 w-24 rounded bg-slate-200" />
          <div className="mt-2 divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between px-4 py-4">
                <div className="h-4 w-32 rounded bg-slate-200" />
                <div className="h-5 w-16 rounded bg-slate-200" />
              </div>
            ))}
          </div>

          <div className="mt-6 h-12 w-full rounded-xl bg-indigo-200" />
        </div>
      </div>
    </section>
  );
}
