// import React, { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { navLinks, utilityActions, logoConfig } from "../data";

// const Topbar = () => {
//   const [timeString, setTimeString] = useState(() => {
//     if (typeof window !== "undefined") {
//       return new Date().toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: false,
//         timeZoneName: "shortOffset",
//       });
//     }
//     return;
//   });
//   const [active, setActive] = useState(navLinks.id === 1);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);

//   useEffect(() => {
//     const updateTime = () => {
//       setTimeString(
//         new Date().toLocaleTimeString("en-US", {
//           hour: "numeric",
//           minute: "2-digit",
//           hour12: false,
//           timeZoneName: "shortOffset",
//         }),
//       );
//     };

//     const timer = setInterval(updateTime, 1000);
//     return () => clearInterval(timer);
//   }, []);
//   const LogoIcon = logoConfig.icon;

//   return (
//     <div className="sticky top-0 z-50 flex p-4 items-center justify-between bg-white/80 backdrop-blur">
//       <Link
//         to="/"
//         className="text-slate-500 hover:text-slate-900 transition-colors"
//       >
//         <LogoIcon size={20} />
//       </Link>
//       <div className="flex gap-6 items-center text-slate-500">
//         {navLinks.map((link) => {
//           const IconComponent = link.icon;
//           return (
//             <NavLink
//               key={link.id}
//               to={link.to}
//               className={({ isActive }) =>
//                 `flex items-center gap-2 transition-colors hover:text-slate-600 ${
//                   isActive ? "text-slate-600 font-semibold" : "text-slate-400"
//                 }`
//               }
//             >
//               <IconComponent size={18} className="shrink-0" />
//               <span className="leading-none">{link.name}</span>
//             </NavLink>
//           );
//         })}
//       </div>
//       <div className="flex gap-4 items-center text-slate-500">
//         <span className="text-sm font-medium mr-2">{timeString}</span>
//         <Link
//           to="/create"
//           className="hover:text-slate-900 font-medium text-sm transition-colors"
//         >
//           Create Event
//         </Link>

//         {utilityActions.map((action) => {
//           const ActionIcon = action.icon;
//           if (action.to) {
//             return (
//               <Link
//                 key={action.id}
//                 to={action.to}
//                 title={action.name}
//                 className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50"
//               >
//                 <ActionIcon size={action.size} />
//               </Link>
//             );
//           }

//           return (
//             <button
//               key={action.id}
//               to={link.to}
//               title={action.name}
//               className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50 cursor-pointer"
//             >
//               <ActionIcon size={action.size} />
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };
// export default Topbar;

import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { navLinks, utilityActions, logoConfig } from "../data";
import SearchModal from "./SearchModal"; // Import your SearchModal

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

  // Update live clock every second
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

  // Global Keyboard Shortcut (Cmd+K / Ctrl+K) to open search
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
      <div className="sticky top-0 z-50 flex p-4 items-center justify-between bg-white/80 backdrop-blur border-b border-slate-100">
        <Link
          to="/"
          className="text-slate-500 hover:text-slate-900 transition-colors"
        >
          <LogoIcon size={20} />
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-6 items-center text-slate-500">
          {navLinks.map((link) => {
            const IconComponent = link.icon;
            return (
              <NavLink
                key={link.id}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 transition-colors hover:text-slate-600 ${
                    isActive ? "text-slate-600 font-semibold" : "text-slate-400"
                  }`
                }
              >
                <IconComponent size={18} className="shrink-0" />
                <span className="leading-none">{link.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Right Utility Section */}
        <div className="flex gap-4 items-center text-slate-500">
          <span className="text-sm font-medium mr-2">{timeString}</span>
          <Link
            to="/create"
            className="hover:text-slate-900 font-medium text-sm transition-colors"
          >
            Create Event
          </Link>

          {utilityActions.map((action) => {
            const ActionIcon = action.icon;

            // INTERCEPT SEARCH: Open Modal instead of navigating
            if (action.id === "search") {
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  title={`${action.name} (Cmd+K)`}
                  className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50 cursor-pointer"
                >
                  <ActionIcon size={action.size} />
                </button>
              );
            }

            // Default behavior for standard utility links (Notifications, Users, etc.)
            if (action.to) {
              return (
                <Link
                  key={action.id}
                  to={action.to}
                  title={action.name}
                  className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50"
                >
                  <ActionIcon size={action.size} />
                </Link>
              );
            }

            return (
              <button
                key={action.id}
                type="button"
                title={action.name}
                className="hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-50 cursor-pointer"
              >
                <ActionIcon size={action.size} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Render the Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Topbar;
