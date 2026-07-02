import { useEffect } from "react";

export function useClickOutside(ref, onOutsideClick, active = true) {
  useEffect(() => {
    if (!active) return;

    const handlePointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [ref, onOutsideClick, active]);
}
