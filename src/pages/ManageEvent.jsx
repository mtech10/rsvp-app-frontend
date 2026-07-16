import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { deleteEvent } from "../services/eventService";
import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getGuests, approveGuest, rejectGuest } from "../services/rsvpService";

export default function ManageEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guests, setGuests] = useState([]);

  const refreshGuests = async () => {
    try {
      const guestData = await getGuests(id);
      setGuests(guestData.guests);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEvent(id);
        setEvent(data.event);

        await refreshGuests();
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

  const handleApprove = async (rsvpId) => {
    try {
      await approveGuest(rsvpId);
      await refreshGuests();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleReject = async (rsvpId) => {
    try {
      await rejectGuest(rsvpId);
      await refreshGuests();
    } catch (err) {
      alert(err.message);
    }
  };
  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <EventDetailsLayout
      event={event}
      guests={guests}
      mode="organizer"
      onDelete={handleDelete}
      onClose={() => navigate("/my-events")}
      onApprove={handleApprove}
      onReject={handleReject}
    />
  );
}
