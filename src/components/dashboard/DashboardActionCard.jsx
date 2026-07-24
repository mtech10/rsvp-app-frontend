import { motion } from "framer-motion";
import { cardHover, buttonTap } from "../../animations/motion";

export default function DashboardActionCard({
  icon: Icon,
  title,
  description,
  iconColor = "text-slate-700",
  borderColor = "border-slate-200",
  hoverColor = "hover:bg-slate-50",
  variant = "default",
  onClick,
}) {
  const isDanger = variant === "danger";
  const finalBorderColor = isDanger ? "border-red-200" : borderColor;
  const finalHoverColor = isDanger ? "hover:bg-red-50" : hoverColor;
  const finalIconColor = isDanger ? "text-red-600" : iconColor;

  return (
    <motion.button
      variants={{
        ...cardHover,
        ...buttonTap,
      }}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`
        flex
        w-full
        items-start
        gap-4
        rounded-2xl
        border
        px-5
        py-4
        text-left
        transition-all
        duration-200
        ${finalBorderColor}
        ${finalHoverColor}
      `}
    >
      {Icon && <Icon size={20} className={`mt-0.5 ${finalIconColor}`} />}

      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </motion.button>
  );
}
