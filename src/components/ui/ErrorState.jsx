import { AlertTriangle } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  description,
  action,
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle size={30} className="text-red-600" />
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        <p className="mt-3 text-slate-500">{description}</p>

        {action && <div className="mt-8">{action}</div>}
      </div>
    </div>
  );
}
