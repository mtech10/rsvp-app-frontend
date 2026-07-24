import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/motion";

import { DashboardStatCard } from "../dashboard";

export default function StatsGrid({
  cards,
  className = "",
  columns = "md:grid-cols-4",
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`mt-8 grid grid-cols-2 gap-4 ${columns} ${className}`}
    >
      {cards.map((card) => (
        <DashboardStatCard
          key={card.label}
          title={card.label}
          value={card.value}
          subtitle={card.subtitle}
          icon={card.icon}
          iconColor={card.color}
          bg={card.bg}
          border={card.border}
          active={card.active}
          onClick={card.onClick}
        />
      ))}
    </motion.div>
  );
}
