import { apiFetch } from "./api";

export function createEvent(eventData) {
  return apiFetch("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function getMyEvents() {
  return apiFetch("/events/my", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function getEvent(id) {
  return apiFetch(`/events/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}
