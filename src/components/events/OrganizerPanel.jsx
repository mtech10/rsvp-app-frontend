// import { useNavigate } from "react-router-dom";
// import {
//   Download,
//   Pencil,
//   Trash2,
//   Settings,
//   Share2,
//   Copy,
//   CalendarPlus,
// } from "lucide-react";
// import DashboardSection from "../dashboard/DashboardSection";
// import QuickActions from "../ui/QuickActions";
// import { useState } from "react";
// import ShareEventModal from "../overlays/ShareEventModal";
// import QuickActionGrid from "../ui/QuickActionGrid";

// export default function OrganizerPanel({ event, onDelete, onExport }) {
//   const [shareOpen, setShareOpen] = useState(false);

//   const navigate = useNavigate();

//   const actions = [
//     {
//       label: "Edit",
//       icon: Pencil,
//       onClick: () => navigate(`/my-events/${event._id}/edit`),
//     },

//     {
//       label: "Share",
//       icon: Share2,
//       onClick: () => setShareOpen(true),
//     },

//     {
//       label: "Export",
//       icon: Download,
//       onClick: onExport,
//     },

//     {
//       label: "Duplicate",
//       icon: Copy,
//       onClick: () => {
//         console.log("Duplicate Event");
//       },
//     },

//     {
//       label: "Calendar",
//       icon: CalendarPlus,
//       onClick: () => {
//         console.log("Calendar");
//       },
//     },

//     {
//       label: "Delete",
//       icon: Trash2,
//       onClick: onDelete,
//       bg: "bg-red-50",
//       iconColor: "text-red-600",
//     },
//   ];

//   return (
//     <>
//       <DashboardSection
//         className="mt-10"
//         title="Organizer Actions"
//         description="Manage this event."
//         icon={Settings}
//       >
//         {" "}
//         <QuickActionGrid actions={actions} />
//       </DashboardSection>
//       <ShareEventModal
//         isOpen={shareOpen}
//         onClose={() => setShareOpen(false)}
//         event={event}
//       />
//     </>
//   );
// }

// OrganizerPanel.jsx

import { useNavigate } from "react-router-dom";
import {
  Download,
  Pencil,
  Trash2,
  Settings,
  Share2,
  Copy,
  CalendarPlus,
} from "lucide-react";
import DashboardSection from "../dashboard/DashboardSection";
import { useState } from "react";
import ShareEventModal from "../overlays/ShareEventModal";
import QuickActionGrid from "../ui/QuickActionGrid";

export default function OrganizerPanel({ event, onDelete, onExport }) {
  const [shareOpen, setShareOpen] = useState(false);

  const navigate = useNavigate();

  const handleDuplicate = () => {
    navigate(`/create-event?duplicate=${event._id}`);
  };

  const actions = [
    {
      label: "Edit",
      icon: Pencil,
      onClick: () => navigate(`/my-events/${event._id}/edit`),
    },

    {
      label: "Share",
      icon: Share2,
      onClick: () => setShareOpen(true),
    },

    {
      label: "Export",
      icon: Download,
      onClick: onExport,
    },

    {
      label: "Duplicate",
      icon: Copy,
      onClick: () => {
        navigate(`/create?duplicate=${event._id}`);
      },
    },

    {
      label: "Calendar",
      icon: CalendarPlus,
      onClick: () => {
        console.log("Calendar");
      },
    },

    {
      label: "Delete",
      icon: Trash2,
      onClick: onDelete,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  return (
    <>
      <DashboardSection
        className="mt-10"
        title="Organizer Actions"
        description="Manage this event."
        icon={Settings}
      >
        <QuickActionGrid actions={actions} />
      </DashboardSection>

      <ShareEventModal
        isOpen={shareOpen}
        onClose={() => setShareOpen(false)}
        event={event}
      />
    </>
  );
}
