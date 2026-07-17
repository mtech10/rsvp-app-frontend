import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, utilityActions, logoConfig } from "../data";
import SearchModal from "./SearchModal";
import NotificationBell from "./notifications/NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";
import { Bell } from "lucide-react";

const Topbar = () => {
  const [timeString, setTimeString] = useState(() => {
    if (typeof window !== "undefined") {
      return new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: false,
        timeZoneName: "shortOffset",
      });
    }
    return "";
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const updateTime = () => {
      setTimeString(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: false,
          timeZoneName: "shortOffset",
        }),
      );
    };

    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const LogoIcon = logoConfig.icon;

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-100 bg-white/80 p-4 backdrop-blur">
        <Link
          to="/"
          className="text-slate-500 transition-colors hover:text-slate-900"
        >
          <LogoIcon size={20} />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-slate-500">
          {navLinks.map((link) => {
            const IconComponent = link.icon;

            return (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors hover:text-slate-600 ${
                    isActive ? "font-semibold text-slate-600" : "text-slate-400"
                  }`
                }
              >
                <IconComponent size={18} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 text-slate-500">
          <span className="mr-2 text-sm font-medium">{timeString}</span>

          <Link
            to="/create"
            className="text-sm font-medium transition-colors hover:text-slate-900"
          >
            Create Event
          </Link>

          {utilityActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.id}
                onClick={() => setIsSearchOpen(true)}
                className="rounded-full p-2 transition hover:bg-slate-100"
              >
                <Icon size={action.size} />
              </button>
            );
          })}

          {user && (
            <>
              <NotificationBell />
              <ProfileMenu onLogout={logout} />
            </>
          )}
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Topbar;
