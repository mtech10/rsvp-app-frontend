import { motion } from "framer-motion";
import { cardHover } from "../../animations/motion";

export default function DashboardStatCard({
  icon: Icon,
  title,
  value,
  subtitle,
  iconColor = "text-slate-700",
  bg = "bg-white",
  border = "border-slate-200",
  active = false,
  onClick,
}) {
  return (
    <motion.button
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        border
        p-4
        text-left
        transition-all
        duration-300
        shadow-sm
        ${bg}
        ${border}
        ${active ? "ring-2 ring-slate-900 shadow-md" : ""}
      `}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{title}</span>

        {Icon && <Icon size={20} className={iconColor} />}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-bold leading-none text-slate-900">
          {value}
        </h3>

        {subtitle && (
          <p className="mt-2 text-xs leading-5 text-slate-500">{subtitle}</p>
        )}
      </div>
    </motion.button>
  );
}
