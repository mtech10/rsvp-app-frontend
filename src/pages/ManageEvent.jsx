import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { deleteEvent } from "../services/eventService";
import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getGuests, approveGuest, rejectGuest } from "../services/rsvpService";
import { exportGuestsToCSV } from "../utility/exportGuests";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";

export default function ManageEvent() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [guestFilter, setGuestFilter] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

    const matchesAnalytics =
      guestFilter === "all" || guest.status === guestFilter;

    return matchesSearch && matchesStatus && matchesAnalytics;
  });

  const refreshGuests = async () => {
    try {
      const guestData = await getGuests(id);
      setGuests(guestData.guests);
    } catch (err) {
      console.error(err);
    }
  };

  const handleExport = () => {
    exportGuestsToCSV(event, filteredGuests);
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
    try {
      await deleteEvent(event._id);

      toast.success("Event deleted successfully.");

      navigate("/my-events");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete event.");
    }
  };

  const handleApprove = async (rsvpId) => {
    try {
      await approveGuest(rsvpId);
      await refreshGuests();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleReject = async (rsvpId) => {
    try {
      await rejectGuest(rsvpId);
      await refreshGuests();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <EventDetailsLayout
        event={event}
        guests={filteredGuests}
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        mode="organizer"
        onDelete={() => setShowDeleteModal(true)}
        onApprove={handleApprove}
        onReject={handleReject}
        onClose={() => navigate("/my-events")}
        stats={{
          totalGuests,
          approvedGuests,
          pendingGuests,
          rejectedGuests,
        }}
        onExport={handleExport}
        guestFilter={guestFilter}
        setGuestFilter={setGuestFilter}
      />
      <ConfirmationModal
        open={showDeleteModal}
        title="Delete Event?"
        message="This action cannot be undone."
        confirmText="Delete Event"
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          setShowDeleteModal(false);
          await handleDelete();
        }}
      />
    </>
  );
}
