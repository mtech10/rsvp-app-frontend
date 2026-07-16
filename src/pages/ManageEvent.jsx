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
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const totalGuests = guests.length;

  const pendingGuests = guests.filter(
    (guest) => guest.status === "pending",
  ).length;

  const approvedGuests = guests.filter(
    (guest) => guest.status === "going",
  ).length;

  const rejectedGuests = guests.filter(
    (guest) => guest.status === "rejected",
  ).length;

  const filteredGuests = guests.filter((guest) => {
    const matchesSearch =
      guest.user.name.toLowerCase().includes(search.toLowerCase()) ||
      guest.user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || guest.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      guests={filteredGuests}
      search={search}
      setSearch={setSearch}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      mode="organizer"
      onDelete={handleDelete}
      onApprove={handleApprove}
      onReject={handleReject}
      onClose={() => navigate("/my-events")}
      stats={{
        totalGuests,
        approvedGuests,
        pendingGuests,
        rejectedGuests,
      }}
    />
  );
}
