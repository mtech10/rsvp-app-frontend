import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getEvent } from "../services/eventService";
import { createRSVP, cancelRSVP, getMyRSVP } from "../services/rsvpService";

export default function EventDetails() {
  const { id } = useParams();

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
      await createRSVP(id, tickets);

      const [eventData, rsvpData] = await Promise.all([
        getEvent(id),
        getMyRSVP(id),
      ]);

      setEvent(eventData.event);
      setMyRSVP(rsvpData.rsvp);
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleCancel() {
    try {
      await cancelRSVP(id);

      const eventData = await getEvent(id);

      setEvent(eventData.event);
      setMyRSVP(null);
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <EventDetailsLayout
      event={event}
      myRSVP={myRSVP}
      onRsvp={handleRsvp}
      onCancel={handleCancel}
    />
  );
}
