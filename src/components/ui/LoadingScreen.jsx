export default function LoadingScreen({
  title = "Loading...",
  description = "Please wait while we fetch your data.",
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-8 h-16 w-16 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>

        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

        <p className="mt-2 text-slate-500">{description}</p>
      </div>
    </div>
  );
}
