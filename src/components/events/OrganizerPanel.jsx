import { useNavigate } from "react-router-dom";
import { Download, Pencil, Trash2, Settings, Share2 } from "lucide-react";
import {
  DashboardSection,
  DashboardActionCard,
  DashboardActionList,
} from "../dashboard";
import { useState } from "react";
import ShareEventModal from "../overlays/ShareEventModal";

export default function OrganizerPanel({ event, onDelete, onExport }) {
  const [shareOpen, setShareOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <>
      <DashboardSection
        className="mt-10"
        title="Organizer Actions"
        description="Manage this event."
        icon={Settings}
      >
        {" "}
        <DashboardActionList>
          <DashboardActionCard
            icon={Pencil}
            title="Edit Event"
            description="Update event details, location and schedule."
            onClick={() => navigate(`/my-events/${event._id}/edit`)}
          />

          <DashboardActionCard
            icon={Download}
            title="Export Guests"
            description="Download attendee registrations."
            onClick={onExport}
          />

          <DashboardActionCard
            icon={Trash2}
            title="Delete Event"
            description="Permanently remove this event and every RSVP."
            variant="danger"
            onClick={onDelete}
          />

          <DashboardActionCard
            icon={Share2}
            title="Share Event"
            description="Invite others to this event."
            onClick={() => setShareOpen(true)}
          />
        </DashboardActionList>
      </DashboardSection>
      <ShareEventModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        event={event}
        url={`${window.location.origin}/events/${event._id}`}
      />
      ;
    </>
  );
}
