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

export async function approveGuest(rsvpId) {
  return apiFetch(`/events/rsvp/${rsvpId}/approve`, {
    method: "PATCH",
  });
}

export async function rejectGuest(rsvpId) {
  return apiFetch(`/events/rsvp/${rsvpId}/reject`, {
    method: "PATCH",
  });
}
