import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvent } from "../services/eventService";
import { deleteEvent } from "../services/eventService";
import EventDetailsLayout from "../components/events/EventDetailsLayout";
import { getGuests, approveGuest, rejectGuest } from "../services/rsvpService";
import { exportGuestsToCSV } from "../utility/exportGuests";
import toast from "react-hot-toast";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import LoadingScreen from "../components/ui/LoadingScreen";
import ErrorState from "../components/ui/ErrorState";
import EventDetailsSkeleton from "../components/skeletons/EventDetailsSkeleton";

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
      throw err;
    }
  };

  const handleExport = () => {
    try {
      exportGuestsToCSV(event, filteredGuests);
      toast.success("Guest list exported successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to export the guest list.");
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
    try {
      await deleteEvent(event._id);

      toast.success("Event deleted successfully.");

      navigate("/my-events");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to delete event.");
    }
  };

  const handleApprove = async (rsvpId) => {
    try {
      await approveGuest(rsvpId);
      await refreshGuests();
      toast.success("Guest approved successfully.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to approve guest.");
    }
  };

  const handleReject = async (rsvpId) => {
    try {
      await rejectGuest(rsvpId);
      await refreshGuests();
      toast.success("Guest registration rejected.");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to reject guest.");
    }
  };

  if (loading) {
    return <EventDetailsSkeleton mode="organizer" />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load event"
        description={error}
        action={
          <button
            onClick={() => navigate("/my-events")}
            className="rounded-xl bg-slate-900 px-5 py-3 text-white hover:bg-slate-800"
          >
            Back to My Events
          </button>
        }
      />
    );
  }
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
