import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motion";

export default function DashboardSection({
  title,
  description,
  icon: Icon,
  children,
  className = "",
}) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{
        duration: 0.45,
      }}
      className={`rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ${className}`}
    >
      {(title || description) && (
        <div className="mb-8 flex items-start gap-4">
          {Icon && (
            <div className="rounded-2xl bg-slate-100 p-3">
              <Icon size={22} className="text-slate-700" />
            </div>
          )}

          <div>
            {title && (
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-slate-500">{description}</p>
            )}
          </div>
        </div>
      )}

      {children}
    </motion.section>
  );
}
