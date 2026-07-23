import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  CalendarDays,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { dropdownMenu, dropdownItem } from "../animations/motion";
export default function ProfileMenu({ onLogout }) {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full border border-slate-200 px-2 py-1 transition hover:bg-slate-50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 font-semibold text-white">
          {initials}
        </div>

        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 top-full z-999 mt-3 w-72 rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="border-b p-5">
              <h3 className="font-semibold">{user?.name}</h3>

              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>

            <div className="p-2">
              <motion.div variants={dropdownItem}>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50"
                >
                  <User size={18} />
                  My Profile
                </Link>
              </motion.div>

              <motion.div variants={dropdownItem}>
                <Link
                  to="/my-events"
                  className="flex items-center gap-3 rounded-xl p-3 hover:bg-slate-50"
                >
                  <CalendarDays size={18} />
                  My Events
                </Link>
              </motion.div>

              <motion.div variants={dropdownItem}>
                <button className="flex w-full items-center gap-3 rounded-xl p-3 text-left hover:bg-slate-50">
                  <Settings size={18} />
                  Settings
                </button>
              </motion.div>
              <hr className="my-2" />

              <motion.div variants={dropdownItem}>
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-xl p-3 text-left text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
