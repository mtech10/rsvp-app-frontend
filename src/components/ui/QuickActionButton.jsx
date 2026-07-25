import { motion } from "framer-motion";

export default function ShareActionButton({ icon: Icon, label, onClick }) {
  return (
    <motion.button
      whileHover={{
        y: -4,
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className="flex flex-col items-center gap-2"
    >
      <div
        className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100
                    transition
                    hover:bg-slate-200
                "
      >
        <Icon size={20} />
      </div>

      <span className="text-xs font-medium text-slate-600">{label}</span>
    </motion.button>
  );
}
