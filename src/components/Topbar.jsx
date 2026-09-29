import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { navLinks, utilityActions, logoConfig } from "../data";

import SearchModal from "./SearchModal";
import NotificationBell from "./notifications/NotificationBell";
import ProfileMenu from "./ProfileMenu";
import { useAuth } from "../context/AuthContext";
import { Menu, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [mobileMenuSession, setMobileMenuSession] = useState(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);

  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobileMenuOpen =
    Boolean(user) &&
    mobileMenuSession?.pathname === location.pathname &&
    mobileMenuSession?.user === user;

  const toggleMobileMenu = () => {
    setMobileMenuSession(
      isMobileMenuOpen ? null : { pathname: location.pathname, user },
    );
  };

  const closeMobileMenu = () => setMobileMenuSession(null);

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

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnOutsidePointer = (event) => {
      if (
        !mobileMenuRef.current?.contains(event.target) &&
        !mobileMenuToggleRef.current?.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeMobileMenu();
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMobileMenuOpen]);

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
      <div className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-100 bg-white/90 px-4 backdrop-blur-md">
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
            <div className="hidden items-center gap-6 text-slate-500 sm:flex">
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
            <div className="flex items-center gap-1.5 text-slate-500 sm:gap-4">
              <span className="mr-2 hidden text-sm font-medium sm:inline">
                {timeString}
              </span>

              <button
                ref={mobileMenuToggleRef}
                type="button"
                onClick={handleCreateEvent}
                className="hidden text-sm font-medium transition-colors hover:text-slate-900 sm:inline-flex"
                aria-label="Create Event"
                title="Create Event"
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

              <button
                type="button"
                onClick={toggleMobileMenu}
                className="relative z-50 rounded-full p-2 transition hover:bg-slate-100 sm:hidden"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
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
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSignIn}
                className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800 sm:px-5 sm:py-2.5"
              >
                Sign in
              </button>
            </div>
          </>
        )}

        <AnimatePresence>
          {user && isMobileMenuOpen && (
            <>
              <motion.button
                key="mobile-menu-backdrop"
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.16 }}
                className="fixed inset-x-0 bottom-0 top-16 z-40 cursor-default bg-slate-950/10 sm:hidden"
              />
              <motion.nav
                key="mobile-navigation"
                ref={mobileMenuRef}
                id="mobile-navigation"
                aria-label="Mobile navigation"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white px-4 py-3 shadow-lg sm:hidden"
              >
                <div className="mx-auto flex max-w-6xl flex-col gap-1">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    const destination =
                      link.name === "Events" ? "/events" : link.to;

                    return (
                      <NavLink
                        key={link.id}
                        to={destination}
                        onClick={closeMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-600 hover:bg-slate-50"
                          }`
                        }
                      >
                        <IconComponent size={18} />
                        <span>{link.name}</span>
                      </NavLink>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                      handleCreateEvent();
                    }}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    <Plus size={18} />
                    <span>Create Event</span>
                  </button>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Topbar;
