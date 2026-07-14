import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventForm from "../components/events/EventForm";
import { getEventById } from "../services/eventService";

export default function EditEvent() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const { event } = await getEventById(id);
        setEvent(event);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <EventForm mode="edit" event={event} />;
}
