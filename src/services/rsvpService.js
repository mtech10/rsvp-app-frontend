import { apiFetch } from "./api";

export async function createRSVP(eventId, tickets = 1) {
  return apiFetch(`/events/${eventId}/rsvp`, {
    method: "POST",
    body: JSON.stringify({ tickets }),
  });
}

export async function cancelRSVP(eventId) {
  return apiFetch(`/events/${eventId}/rsvp`, {
    method: "DELETE",
  });
}

export async function getGuests(eventId) {
  return apiFetch(`/events/${eventId}/guests`);
}

export async function getMyRSVP(eventId) {
  return apiFetch(`/events/${eventId}/my-rsvp`);
}
