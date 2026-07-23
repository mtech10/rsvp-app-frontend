// import { motion } from "framer-motion";

// export default function LayoutTransition({ children }) {
//   return (
//     <motion.div
//       initial={{
//         opacity: 0,
//         y: 12,
//       }}
//       animate={{
//         opacity: 1,
//         y: 0,
//       }}
//       exit={{
//         opacity: 0,
//         y: -8,
//       }}
//       transition={{
//         duration: 0.58,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="w-full"
//     >
//       {children}
//     </motion.div>
//   );
// }

import { motion } from "framer-motion";

export default function LayoutTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.35,
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
