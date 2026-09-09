import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { navLinks, utilityActions, logoConfig } from "../data";

import SearchModal from "./SearchModal";
import NotificationBell from "./notifications/NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";

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
  const location = useLocation();
  const navigate = useNavigate();

  const isDiscoverPage =
    location.pathname === "/discover" ||
    location.pathname.startsWith("/discover/") ||
    location.pathname.startsWith("/category/");

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

    updateTime();

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

  const handleSignIn = () => {
    const returnTo = location.pathname + location.search + location.hash;

    navigate(`/login?returnTo=${encodeURIComponent(returnTo)}`);
  };

  const handleCreateEvent = () => {
    if (!user) {
      handleSignIn();
      return;
    }

    navigate("/create");
  };

  return (
    <>
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-100 bg-white/70 px-4 backdrop-blur-md">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center text-slate-500 transition-colors hover:text-slate-900"
          aria-label="Home"
        >
          <LogoIcon size={20} />
        </Link>

        {/* Logged-in Navigation */}
        {user ? (
          <>
            <div className="flex items-center gap-6 text-slate-500">
              {navLinks.map((link) => {
                const IconComponent = link.icon;

                const destination =
                  link.name === "Events" ? "/events" : link.to;

                return (
                  <NavLink
                    key={link.id}
                    to={destination}
                    className={({ isActive }) =>
                      `flex items-center gap-2 transition-colors hover:text-slate-600 ${
                        isActive
                          ? "font-semibold text-slate-600"
                          : "text-slate-400"
                      }`
                    }
                  >
                    <IconComponent size={18} />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Logged-in Right Section */}
            <div className="flex items-center gap-4 text-slate-500">
              <span className="mr-2 text-sm font-medium">{timeString}</span>

              <button
                type="button"
                onClick={handleCreateEvent}
                className="text-sm font-medium transition-colors hover:text-slate-900"
              >
                Create Event
              </button>

              {utilityActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="rounded-full p-2 transition hover:bg-slate-100"
                    aria-label={action.name || "Search"}
                  >
                    <Icon size={action.size} />
                  </button>
                );
              })}

              <NotificationBell />

              <ProfileMenu onLogout={logout} />
            </div>
          </>
        ) : (
          <>
            {/* Public Navigation */}
            <div className="flex flex-1 items-center justify-center">
              {isDiscoverPage && (
                <span className="text-sm font-medium text-slate-600">
                  Discover Events
                </span>
              )}
            </div>

            {/* Public Right Section */}
            <button
              type="button"
              onClick={handleSignIn}
              className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              Sign in
            </button>
          </>
        )}
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Topbar;
