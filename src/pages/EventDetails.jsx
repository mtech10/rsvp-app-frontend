import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRSVP } from "../context/RSVPContext";
import { useAuth } from "../context/AuthContext";
import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getEvent } from "../services/eventService";
import { createRSVP, cancelRSVP, getMyRSVP } from "../services/rsvpService";
import toast from "react-hot-toast";
import useRequireAuth from "../hooks/useRequireAuth";

import EventDetailsSkeleton from "../components/skeletons/EventDetailsSkeleton";
import PageLoader from "../components/ui/PageLoader";

export default function EventDetails() {
  const { id } = useParams();

  const { user } = useAuth();
  const { requireAuth } = useRequireAuth();

  const { addRsvp, cancelRsvp: removeRsvp } = useRSVP();

  const [event, setEvent] = useState(null);
  const [myRSVP, setMyRSVP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const [eventData, rsvpData] = await Promise.all([
          getEvent(id),
          getMyRSVP(id),
        ]);

        setEvent(eventData.event);
        setMyRSVP(rsvpData.rsvp);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  async function handleRsvp(tickets = 1) {
    if (!requireAuth()) return;

    try {
      const response = await createRSVP(id, tickets);

      const [eventData, rsvpData] = await Promise.all([
        getEvent(id),
        getMyRSVP(id),
      ]);

      const updatedEvent = eventData.event;
      const updatedRsvp = rsvpData.rsvp;

      setEvent(updatedEvent);
      setMyRSVP(updatedRsvp);

      addRsvp(updatedEvent, updatedRsvp);

      toast.success(
        updatedEvent.requireApproval
          ? "Registration request submitted successfully."
          : "RSVP confirmed successfully.",
      );
    } catch (err) {
      console.error("❌ RSVP ERROR:", err);
      toast.error(err.message || "Failed to submit RSVP.");
    }
  }

  async function handleCancel() {
    if (!requireAuth()) return;

    try {
      await cancelRSVP(id);

      const eventData = await getEvent(id);

      setEvent(eventData.event);
      setMyRSVP(null);

      removeRsvp(id);

      toast.success("Registration cancelled successfully.");
    } catch (err) {
      console.error(err);

      toast.error(err.message || "Failed to cancel registration.");
    }
  }

  const eventHostId =
    typeof event?.host === "object"
      ? event.host?._id || event.host?.id
      : event?.host;

  const currentUserId = user?._id || user?.id;

  const isHost =
    Boolean(eventHostId) &&
    Boolean(currentUserId) &&
    String(eventHostId) === String(currentUserId);

  return (
    <PageLoader loading={loading} skeleton={<EventDetailsSkeleton />}>
      <EventDetailsLayout
        event={event}
        myRSVP={myRSVP}
        onRsvp={handleRsvp}
        onCancel={handleCancel}
        mode={isHost ? "organizer" : "public"}
      />
    </PageLoader>
  );
}
