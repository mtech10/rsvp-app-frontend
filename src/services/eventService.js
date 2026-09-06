import { apiFetch } from "./api";

export function createEvent(eventData) {
  return apiFetch("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export function getMyEvents() {
  return apiFetch("/events/my-events");
}

export function getEvent(id) {
  return apiFetch(`/events/${id}`);
}

export function getEvents(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();

  return apiFetch(`/events${query ? `?${query}` : ""}`);
}

export function getNearbyEvents({
  latitude,
  longitude,
  radius = 25000,
  category,
  search,
} = {}) {
  const searchParams = new URLSearchParams();

  searchParams.set("latitude", latitude);
  searchParams.set("longitude", longitude);
  searchParams.set("radius", radius);

  if (category) {
    searchParams.set("category", category);
  }

  if (search) {
    searchParams.set("search", search);
  }

  return apiFetch(`/events/nearby?${searchParams.toString()}`);
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
  return apiFetch(`/events/${id}`);
}

export function getEventAnalytics(eventId) {
  return apiFetch(`/events/${eventId}/analytics`);
}
