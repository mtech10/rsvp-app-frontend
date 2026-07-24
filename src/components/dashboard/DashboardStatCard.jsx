import { motion } from "framer-motion";
import { cardHover, buttonTap } from "../../animations/motion";

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
        rounded-2xl
        border
        p-6
        text-left
        transition-all
        duration-300
        shadow-sm
        ${bg}
        ${border}
        ${active ? "ring-2 ring-slate-900 shadow-lg" : ""}
      `}
    >
      <div className="mb-5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">{title}</span>

        {Icon && <Icon size={22} className={iconColor} />}
      </div>

      <h3 className="text-4xl font-bold text-slate-900">{value}</h3>

      {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
    </motion.button>
  );
}
