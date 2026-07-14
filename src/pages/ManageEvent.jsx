import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { deleteEvent } from "../services/eventService";
import EventDetailsLayout from "../components/events/EventDetailsLayout";

export default function ManageEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEvent(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    try {
      await deleteEvent(event._id);

      alert("Event deleted successfully.");

      navigate("/my-events");
    } catch (err) {
      console.error(err);
      alert("Failed to delete event.");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <EventDetailsLayout
      event={event}
      mode="organizer"
      onClose={() => navigate("/my-events")}
    />
  );
}
