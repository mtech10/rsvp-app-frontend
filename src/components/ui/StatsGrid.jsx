import { motion } from "framer-motion";
import { staggerContainer } from "../../animations/motion";

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
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${card.bg ?? "bg-slate-100"}`}>
                <Icon size={22} className={card.color ?? "text-slate-600"} />
              </div>
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
