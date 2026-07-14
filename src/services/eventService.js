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
  return apiFetch("/events/my-events", {
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

export function getEvents() {
  return apiFetch("/events");
}

export function updateEvent(id, eventData) {
  return apiFetch(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(eventData),
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function deleteEvent(id) {
  return apiFetch(`/events/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

export function getEventById(id) {
  return apiFetch(`/events/${id}`);
}
