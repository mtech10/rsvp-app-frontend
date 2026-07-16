import { apiFetch } from "./api";

export function getNotifications() {
  return apiFetch("/notifications");
}

export function markNotificationAsRead(id) {
  return apiFetch(`/notifications/${id}/read`, {
    method: "PATCH",
  });
}

export function markAllNotificationsAsRead() {
  return apiFetch("/notifications/read-all", {
    method: "PATCH",
  });
}
