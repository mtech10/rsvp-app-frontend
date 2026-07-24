import { motion } from "framer-motion";

export default function DashboardEmptyState({
  icon: Icon,
  title,
  description,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-8 py-12 text-center"
    >
      {Icon && (
        <div className="mb-5 rounded-full bg-white p-4 shadow-sm">
          <Icon size={28} className="text-slate-500" />
        </div>
      )}

      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}
