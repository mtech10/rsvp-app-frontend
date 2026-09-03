import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRSVP } from "../context/RSVPContext";

import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getEvent } from "../services/eventService";
import { createRSVP, cancelRSVP, getMyRSVP } from "../services/rsvpService";
import toast from "react-hot-toast";

import EventDetailsSkeleton from "../components/skeletons/EventDetailsSkeleton";
import PageLoader from "../components/ui/PageLoader";

export default function EventDetails() {
  const { id } = useParams();
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
      console.error("❌ Error message:", err.message);
      console.error("❌ Error response:", err.response);
      toast.error(err.message || "Failed to submit RSVP.");
    }
  }

  // async function handleCancel() {
  //   try {
  //     await cancelRSVP(id);

  //     const eventData = await getEvent(id);

  //     setEvent(eventData.event);
  //     setMyRSVP(null);
  //     toast.success("Registration cancelled successfully.");
  //   } catch (err) {
  //     console.error(err);
  //     toast.error(err.message || "Failed to cancel registration.");
  //   }
  // }

  async function handleCancel() {
    try {
      await cancelRSVP(id);

      const eventData = await getEvent(id);

      setEvent(eventData.event);
      setMyRSVP(null);

      // Remove the event from the Events page immediately
      removeRsvp(id);

      toast.success("Registration cancelled successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to cancel registration.");
    }
  }

  return (
    <PageLoader loading={loading} skeleton={<EventDetailsSkeleton />}>
      <EventDetailsLayout
        event={event}
        myRSVP={myRSVP}
        onRsvp={handleRsvp}
        onCancel={handleCancel}
      />
    </PageLoader>
  );
}
