import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative rounded-full p-2 transition hover:bg-slate-100"
      >
        <Bell size={18} />

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      <NotificationDropdown
        isOpen={open}
        onClose={() => setOpen(false)}
        onCountChange={setCount}
      />
    </div>
  );
}
