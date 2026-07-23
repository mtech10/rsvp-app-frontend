import { motion } from "framer-motion";
import { fadeUp } from "../../animations/motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
