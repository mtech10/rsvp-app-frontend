import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function QuickActions({ title = "Quick Actions", actions }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.label}
              to={action.to}
              className="group flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-indigo-100 p-3">
                  <Icon size={22} className="text-indigo-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {action.label}
                  </h3>

                  <p className="text-sm text-slate-500">{action.description}</p>
                </div>
              </div>

              <ChevronRight
                size={20}
                className="text-slate-400 transition group-hover:translate-x-1"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
