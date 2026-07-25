import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = "max-w-md",
}) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
            y: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: 10,
          }}
          transition={{
            duration: 0.22,
          }}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${maxWidth} overflow-hidden rounded-3xl bg-white shadow-2xl`}
        >
          <div className="flex items-start justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{title}</h2>

              {subtitle && (
                <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 transition hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
