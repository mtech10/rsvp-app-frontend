import { motion } from "framer-motion";
import { cardHover } from "../../animations/motion";

export default function DashboardCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      variants={hover ? cardHover : undefined}
      initial="rest"
      whileHover="hover"
      transition={{ duration: 0.2 }}
      className={`
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        ${hover ? "hover:shadow-md" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
