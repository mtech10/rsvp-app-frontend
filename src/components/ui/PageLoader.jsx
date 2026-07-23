import { AnimatePresence } from "framer-motion";
import LayoutTransition from "./LayoutTransition";

export default function PageLoader({ loading, skeleton, children }) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LayoutTransition key="loading">{skeleton}</LayoutTransition>
      ) : (
        <LayoutTransition key="content">{children}</LayoutTransition>
      )}
    </AnimatePresence>
  );
}
