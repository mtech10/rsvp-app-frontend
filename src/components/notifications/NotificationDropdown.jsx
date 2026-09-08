import { useEffect, useState, useRef } from "react";
import {
  Bell,
  CheckCheck,
  CalendarDays,
  UserCheck,
  UserX,
  UserPlus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "../../services/notificationService";
import { timeAgo } from "../../utility/timeUtility";
import NotificationSkeleton from "./NotificationSkeleton";
import NotificationEmptyState from "./NotificationEmptyState";

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
      const items = data?.notifications || [];

      setNotifications(items);

      onCountChange?.(
        items.filter((notification) => !notification.read).length,
      );
    } catch (err) {
      console.error("LOAD NOTIFICATIONS ERROR:", err);
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
        (notification) => !notification.read && notification._id !== id,
      ).length;

      onCountChange?.(unread);
    } catch (err) {
      console.error("MARK NOTIFICATION READ ERROR:", err);
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
      console.error("MARK ALL NOTIFICATIONS READ ERROR:", err);
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
      className="
        absolute
        right-0
        top-12
        z-50
        w-[min(24rem,calc(100vw-2rem))]
        max-w-[calc(100vw-2rem)]
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-2xl
        ring-1
        ring-slate-200/60
      "
    >
      {/* Header */}
      <div className="flex min-w-0 items-center justify-between gap-3 border-b p-5">
        <div className="flex min-w-0 items-center gap-2">
          <Bell size={20} className="shrink-0 text-slate-500" />

          <h2 className="truncate font-semibold text-slate-900">
            Notifications
          </h2>
        </div>

        <button
          type="button"
          onClick={handleReadAll}
          className="
            flex
            shrink-0
            items-center
            gap-2
            rounded-lg
            px-2
            py-1
            text-sm
            font-medium
            text-indigo-600
            transition
            hover:bg-indigo-50
          "
        >
          <CheckCheck size={16} />
          <span>Mark all</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="overflow-hidden">
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
          <NotificationSkeleton />
        </div>
      ) : notifications.length === 0 ? (
        <div className="overflow-hidden">
          <NotificationEmptyState />
        </div>
      ) : (
        <div className="max-h-[28rem] overflow-x-hidden overflow-y-auto">
          {notifications.map((notification) => (
            <button
              key={notification._id}
              type="button"
              onClick={async () => {
                await handleRead(notification._id);

                if (notification.event?._id) {
                  const organizerNotifications = [
                    "rsvp_request",
                    "rsvp_cancelled",
                  ];

                  if (organizerNotifications.includes(notification.type)) {
                    navigate(`/my-events/${notification.event._id}`);
                  } else {
                    navigate(`/events/${notification.event._id}`);
                  }
                }

                onClose?.();
              }}
              className={`
                flex
                w-full
                min-w-0
                items-start
                gap-4
                border-b
                border-slate-200
                p-4
                text-left
                transition-colors
                duration-200
                hover:bg-slate-50
                ${!notification.read ? "bg-indigo-50" : ""}
              `}
            >
              {/* Icon */}
              <div className="mt-1 shrink-0 text-indigo-600">
                {getIcon(notification.type)}
              </div>

              {/* Notification content */}
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <h3 className="min-w-0 flex-1 break-words font-medium text-slate-900">
                    {notification.title}
                  </h3>

                  <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">
                    {timeAgo(notification.createdAt)}
                  </span>
                </div>

                <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                  {notification.message}
                </p>
              </div>

              {/* Unread indicator */}
              {!notification.read && (
                <div className="mt-2 h-2 w-2 shrink-0 animate-pulse rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
