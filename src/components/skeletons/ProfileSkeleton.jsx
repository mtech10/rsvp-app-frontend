export default function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-5xl animate-pulse space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:text-left">
          <div className="h-24 w-24 rounded-full bg-slate-200" />

          <div className="flex-1">
            <div className="mx-auto h-9 w-56 rounded bg-slate-200 md:mx-0" />
            <div className="mx-auto mt-3 h-4 w-64 rounded bg-slate-200 md:mx-0" />
            <div className="mx-auto mt-5 h-4 w-44 rounded bg-slate-200 md:mx-0" />
          </div>

          <div className="h-10 w-28 rounded-xl border border-slate-200 bg-slate-100" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-14 rounded bg-slate-200" />
                <div className="mt-3 h-8 w-8 rounded bg-slate-200" />
              </div>

              <div className="h-12 w-12 rounded-xl bg-slate-200" />
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-36 rounded bg-slate-200" />

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5"
            >
              <div className="h-12 w-12 rounded-xl bg-slate-200" />

              <div className="flex-1">
                <div className="h-5 w-28 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-44 rounded bg-slate-200" />
              </div>

              <div className="h-5 w-3 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
