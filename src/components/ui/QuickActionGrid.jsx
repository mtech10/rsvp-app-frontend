import { motion } from "framer-motion";
import { hoverLift } from "../../animations/motion";

export default function QuickActionGrid({ actions, className = "" }) {
  return (
    <div
      className={`
        mt-8
        flex
        flex-wrap
        justify-center
        gap-8
        ${className}
    `}
    >
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <motion.button
            key={action.label}
            type="button"
            onClick={action.onClick}
            {...hoverLift}
            className="group flex flex-col items-center"
          >
            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                transition
                duration-200
                shadow-sm
                group-hover:shadow-md
                ${action.bg ?? "bg-slate-100"}
              `}
            >
              <Icon
                size={22}
                className={action.iconColor ?? "text-slate-700"}
              />
            </div>

            <span className="mt-3 text-xs font-medium text-slate-600">
              {action.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
