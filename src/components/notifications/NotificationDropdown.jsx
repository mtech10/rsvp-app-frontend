import { useEffect, useState } from "react";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utility/timeUtility";
import NotificationSkeleton from "./NotificationSkeleton";

export default function NotificationDropdown({
  isOpen,
  onClose,
  onCountChange,
}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose?.();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  async function loadNotifications() {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data.notifications);

      onCountChange?.(data.notifications.filter((n) => !n.read).length);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleRead(id) {
    try {
      await markNotificationAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification,
        ),
      );
      const unread = notifications.filter(
        (n) => !n.read && n._id !== id,
      ).length;

      onCountChange?.(unread);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleReadAll() {
    try {
      await markAllNotificationsAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          read: true,
        })),
      );
      onCountChange?.(0);
    } catch (err) {
      console.error(err);
    }
  }

  function getIcon(type) {
    switch (type) {
      case "rsvp_request":
        return <UserPlus size={18} />;

      case "rsvp_approved":
        return <UserCheck size={18} />;

      case "rsvp_rejected":
        return <UserX size={18} />;

      default:
        return <CalendarDays size={18} />;
    }
  }

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`
    absolute
    right-0
    top-12
    z-50
    transition-all
    duration-200
    ease-out
    ${
      isOpen
        ? "translate-y-0 opacity-100 scale-100"
        : "-translate-y-2 opacity-0 scale-95 pointer-events-none"
    }
  `}
    >
      <div className="w-95 sm:w-96 rounded-2xl border border-slate-200 bg-white shadow-2xl ring-1 ring-slate-200/60">
        {" "}
        <div className="flex items-center justify-between border-b p-5">
          <div className="flex items-center gap-2">
            <Bell size={20} />
            <h2 className="font-semibold">Notifications</h2>
          </div>

          <button
            onClick={handleReadAll}
            className="flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            <CheckCheck size={16} />
            Mark all
          </button>
        </div>
        {loading ? (
          <>
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
            <NotificationSkeleton />
          </>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-10">
            <Bell size={42} className="mb-3 text-slate-300" />

            <h3 className="font-semibold text-slate-700">
              You're all caught up
            </h3>

            <p className="mt-2 text-center text-sm text-slate-500">
              New RSVP requests and updates will appear here.
            </p>
          </div>
        ) : (
          <div className="max-h-112.5 overflow-y-auto">
            {notifications.map((notification) => (
              <button
                key={notification._id}
                onClick={async () => {
                  await handleRead(notification._id);

                  if (notification.event?._id) {
                    navigate(`/events/${notification.event._id}`);
                  }

                  onClose?.();
                }}
                className={`flex
w-full
items-start
gap-4
border-b
p-4
text-left
transition-all
duration-200
hover:bg-slate-50
hover:translate-x-1
${!notification.read ? "bg-indigo-50" : ""}`}
              >
                <div className="mt-1 text-indigo-600">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-slate-900">
                      {notification.title}
                    </h3>

                    <span className="shrink-0 text-xs text-slate-400">
                      {timeAgo(notification.createdAt)}
                    </span>
                  </div>

                  <p className="mt-1 text-sm leading-5 text-slate-500">
                    {notification.message}
                  </p>
                </div>

                {!notification.read && (
                  <div className="mt-2 h-2 w-2 animate-pulse rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
