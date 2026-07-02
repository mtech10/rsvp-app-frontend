import React, { useRef, useState } from "react";
import { useClickOutside } from "../utility/useClickOutside";

/**
 * Usage:
 * <Popover
 *   align="left" // or "right" - which edge the dropdown hangs from
 *   trigger={({ open, toggle }) => (
 *     <button onClick={toggle}>...</button>
 *   )}
 * >
 *   {(close) => <DropdownContent onSelect={(v) => { doThing(v); close(); }} />}
 * </Popover>
 */
const Popover = ({ trigger, children, align = "left", className = "" }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const close = () => setOpen(false);
  const toggle = () => setOpen((o) => !o);

  useClickOutside(containerRef, close, open);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {trigger({ open, toggle })}
      {open && (
        <div
          className={`absolute z-40 mt-2 ${align === "right" ? "right-0" : "left-0"}`}
        >
          {children(close)}
        </div>
      )}
    </div>
  );
};

export default Popover;
