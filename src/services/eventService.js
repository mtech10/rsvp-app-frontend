import { apiFetch } from "./api";

export function createEvent(eventData) {
  return apiFetch("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export function getMyEvents() {
  return apiFetch("/events/my-events", {});
}

export function getEvent(id) {
  return apiFetch(`/events/${id}`, {});
}

export function getEvents() {
  return apiFetch("/events");
}

export function updateEvent(id, eventData) {
  return apiFetch(`/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(eventData),
  });
}

export function deleteEvent(id) {
  return apiFetch(`/events/${id}`, {
    method: "DELETE",
  });
}

export function getEventById(id) {
  console.log("===== getEventById HIT =====");
  return apiFetch(`/events/${id}`);
}

export async function getEventAnalytics(eventId) {
  return apiFetch(`/events/${eventId}/analytics`);
}
