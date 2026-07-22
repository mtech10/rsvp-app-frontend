export default function ProtectedRouteSkeleton({ children }) {
  return (
    <div className="min-h-screen animate-pulse bg-linear-to-t from-slate-50 to-blue-100">
      <header className="flex items-center justify-between border-b border-slate-100 bg-white/80 p-4 backdrop-blur">
        <div className="h-5 w-5 rounded bg-slate-200" />

        <div className="hidden items-center gap-6 sm:flex">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-4 w-20 rounded bg-slate-200" />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden h-4 w-16 rounded bg-slate-200 sm:block" />
          <div className="hidden h-4 w-20 rounded bg-slate-200 sm:block" />
          <div className="h-9 w-9 rounded-full bg-slate-200" />
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {children || (
          <>
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="mt-3 h-9 w-56 rounded bg-slate-200" />

            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <div className="h-40 bg-slate-200" />

                  <div className="space-y-4 p-5">
                    <div className="h-4 w-28 rounded bg-slate-200" />
                    <div className="h-6 w-3/4 rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
