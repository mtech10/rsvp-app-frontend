// import {
//   MapPin,
//   ChevronsRight,
//   Copy,
//   ArrowUpRight,
//   ChevronUp,
//   ChevronDown,
//   Building2,
//   X,
//   CalendarPlus,
//   Share2,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { formatDateParts } from "../../utility/dateUtility";
// import { useNavigate } from "react-router-dom";
// import { getMyRSVP } from "../../services/rsvpService";
// import OrganizerPanel from "./OrganizerPanel";
// import GuestStats from "./GuestStats";
// import UserProfileInfo from "./UserProfileInfo";
// import GuestTable from "./GuestTable";
// import RegistrationSection from "./RegistrationSection";
// import { getEventAnalytics } from "../../services/eventService";
// import AnalyticsPanel from "./AnalyticsPanel";
// import { motion } from "framer-motion";
// import EventOverviewCard from "./EventOverviewCard";
// import EventCover from "../ui/EventCover";
// import useEventActions from "../../hooks/useEventActions";

// const EventDetailsLayout = ({
//   event,
//   myRSVP,
//   guests = [],
//   guest,
//   stats = {
//     totalGuests: 0,
//     approvedGuests: 0,
//     pendingGuests: 0,
//     rejectedGuests: 0,
//   },
//   search,
//   setSearch,
//   statusFilter,
//   setStatusFilter,
//   onApprove,
//   onReject,
//   onDelete,
//   onRsvp,
//   onClose,
//   onNavigate,
//   onCancel,
//   mode = "public",
//   onExport,
//   guestFilter,
//   setGuestFilter,
//   hideRegistration = false,
//   currentIndex = 0,
//   totalEvents = 0,
// }) => {
//   const [ticketCount, setTicketCount] = useState(1);
//   const [showApprovalForm, setShowApprovalForm] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [analytics, setAnalytics] = useState(null);
//   const [analyticsLoading, setAnalyticsLoading] = useState(
//     mode === "organizer",
//   );

//   useEffect(() => {
//     if (mode !== "organizer" || !event?._id) return;

//     let isActive = true;

//     async function loadAnalytics() {
//       setAnalyticsLoading(true);

//       try {
//         const { analytics } = await getEventAnalytics(event._id);

//         if (isActive) {
//           setAnalytics(analytics);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         if (isActive) {
//           setAnalyticsLoading(false);
//         }
//       }
//     }

//     loadAnalytics();

//     return () => {
//       isActive = false;
//     };
//   }, [event?._id, mode]);

//   if (!event) return null;

//   const { copyLink, openPublicPage } = useEventActions(event);

//   const isOrganizer = mode === "organizer";

//   const date = formatDateParts(event.startAt);
//   const endDate = formatDateParts(event.endAt);

//   const addressLabel =
//     event.address || event.venue || "Location details coming soon";

//   const cityLabel =
//     event.city ||
//     (event.locationType === "online" ? "Online" : "Various locations");

//   const handleIncrement = () => setTicketCount((prev) => prev + 1);

//   const handleDecrement = () =>
//     setTicketCount((prev) => (prev > 1 ? prev - 1 : 1));

//   const handleRsvpAction = async (tickets = 1) => {
//     try {
//       setLoading(true);

//       await onRsvp?.(tickets);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const submitApprovalRequest = (e) => {
//     e.preventDefault();

//     onRsvp?.(ticketCount);

//     setShowApprovalForm(false);
//     onClose?.();
//   };

//   return (
//     <>
//       <div className="flex flex-1 w-full flex-col overflow-hidden bg-white">
//         <div className="z-10 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
//           <button
//             type="button"
//             onClick={() => onClose?.()}
//             className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
//           >
//             <ChevronsRight size={20} />
//           </button>

//           {!isOrganizer && (
//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={copyLink}
//                 className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
//               >
//                 <Copy size={14} />
//                 Copy Link
//               </button>

//               <button
//                 type="button"
//                 onClick={openPublicPage}
//                 className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
//               >
//                 Open Event Page
//                 <ArrowUpRight size={14} />
//               </button>
//             </div>
//           )}

//           <div className="flex items-center gap-1 text-slate-400">
//             <button
//               type="button"
//               disabled={currentIndex <= 0 || totalEvents <= 1}
//               className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
//               onClick={() => onNavigate?.("prev")}
//             >
//               <ChevronUp size={20} />
//             </button>

//             <button
//               type="button"
//               disabled={currentIndex >= totalEvents - 1 || totalEvents <= 1}
//               className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
//               onClick={() => onNavigate?.("next")}
//             >
//               <ChevronDown size={20} />
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20 pt-8 sm:px-12">
//           <div className="relative flex justify-center">
//             <EventCover
//               key={event._id}
//               src={event.coverUrl}
//               alt={`${event.title} cover`}
//               className="w-full sm:h-[400px] sm:w-[400px]"
//             />
//           </div>

//           <EventOverviewCard
//             key={`overview-${event._id}`}
//             event={event}
//             date={date}
//             endDate={endDate}
//             addressLabel={addressLabel}
//             cityLabel={cityLabel}
//           />

//           {isOrganizer && (
//             <OrganizerPanel
//               event={event}
//               onDelete={onDelete}
//               onExport={onExport}
//             />
//           )}

//           {isOrganizer && <GuestStats stats={stats} />}

//           {isOrganizer && (
//             <AnalyticsPanel
//               analytics={analytics}
//               loading={analyticsLoading}
//               selectedFilter={guestFilter}
//               onSelectFilter={setGuestFilter}
//             />
//           )}

//           {isOrganizer && (
//             <GuestTable
//               guests={guests}
//               filter={guestFilter}
//               onApprove={onApprove}
//               onReject={onReject}
//             />
//           )}

//           <div className="mt-6 flex items-center justify-between gap-4">
//             <p className="text-sm text-slate-500">
//               {event.goingCount || 0}{" "}
//               {(event.goingCount || 0) === 1 ? "person is" : "people are"} going
//             </p>
//           </div>

//           {!isOrganizer && !hideRegistration && (
//             <RegistrationSection
//               key={`registration-${event._id}`}
//               event={event}
//               myRSVP={myRSVP}
//               loading={loading}
//               ticketCount={ticketCount}
//               onIncrement={handleIncrement}
//               onDecrement={handleDecrement}
//               onRegister={() => handleRsvpAction(ticketCount)}
//               onCancel={() => onCancel?.(event._id)}
//               UserProfileInfo={UserProfileInfo}
//               showApprovalForm={showApprovalForm}
//               setShowApprovalForm={setShowApprovalForm}
//               submitApprovalRequest={submitApprovalRequest}
//             />
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default EventDetailsLayout;

// EventDetailsLayout.jsx

import {
  MapPin,
  ChevronsRight,
  Copy,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  Building2,
  X,
  CalendarPlus,
  Share2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDateParts } from "../../utility/dateUtility";
import { getMyRSVP } from "../../services/rsvpService";
import OrganizerPanel from "./OrganizerPanel";
import GuestStats from "./GuestStats";
import UserProfileInfo from "./UserProfileInfo";
import GuestTable from "./GuestTable";
import RegistrationSection from "./RegistrationSection";
import { getEventAnalytics } from "../../services/eventService";
import AnalyticsPanel from "./AnalyticsPanel";
import { motion } from "framer-motion";
import EventOverviewCard from "./EventOverviewCard";
import EventCover from "../ui/EventCover";
import useEventActions from "../../hooks/useEventActions";

const EventDetailsLayout = ({
  event,
  myRSVP,
  guests = [],
  guest,
  stats = {
    totalGuests: 0,
    approvedGuests: 0,
    pendingGuests: 0,
    rejectedGuests: 0,
  },
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onApprove,
  onReject,
  onDelete,
  onRsvp,
  onClose,
  onNavigate,
  onCancel,
  mode = "public",
  onExport,
  guestFilter,
  setGuestFilter,
  hideRegistration = false,
  currentIndex = 0,
  totalEvents = 0,
}) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(
    mode === "organizer",
  );

  useEffect(() => {
    if (mode !== "organizer" || !event?._id) return;

    let isActive = true;

    async function loadAnalytics() {
      setAnalyticsLoading(true);

      try {
        const { analytics } = await getEventAnalytics(event._id);

        if (isActive) {
          setAnalytics(analytics);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (isActive) {
          setAnalyticsLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      isActive = false;
    };
  }, [event?._id, mode]);

  if (!event) return null;

  const { copyLink, openPublicPage } = useEventActions(event);

  const isOrganizer = mode === "organizer";

  const date = formatDateParts(event.startAt);
  const endDate = formatDateParts(event.endAt);

  const addressLabel =
    event.address || event.venue || "Location details coming soon";

  const cityLabel =
    event.city ||
    (event.locationType === "online" ? "Online" : "Various locations");

  const handleIncrement = () => setTicketCount((prev) => prev + 1);

  const handleDecrement = () =>
    setTicketCount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleRsvpAction = async (tickets = 1) => {
    try {
      setLoading(true);
      await onRsvp?.(tickets);
    } finally {
      setLoading(false);
    }
  };

  const submitApprovalRequest = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await onRsvp?.(ticketCount);
      setShowApprovalForm(false);
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-1 flex-col overflow-hidden bg-white">
      <div className="z-10 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
        <button
          type="button"
          onClick={() => onClose?.()}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
        >
          <ChevronsRight size={20} />
        </button>

        {!isOrganizer && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              <Copy size={14} />
              Copy Link
            </button>

            <button
              type="button"
              onClick={openPublicPage}
              className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
            >
              Open Event Page
              <ArrowUpRight size={14} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            disabled={currentIndex <= 0 || totalEvents <= 1}
            className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => onNavigate?.("prev")}
          >
            <ChevronUp size={20} />
          </button>

          <button
            type="button"
            disabled={currentIndex >= totalEvents - 1 || totalEvents <= 1}
            className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => onNavigate?.("next")}
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20 pt-8 sm:px-12">
        <div className="relative flex justify-center">
          <EventCover
            key={event._id}
            src={event.coverUrl}
            alt={`${event.title} cover`}
            className="w-full sm:h-[400px] sm:w-[400px]"
          />
        </div>

        <EventOverviewCard
          key={`overview-${event._id}`}
          event={event}
          date={date}
          endDate={endDate}
          addressLabel={addressLabel}
          cityLabel={cityLabel}
        />

        {isOrganizer && (
          <OrganizerPanel
            event={event}
            onDelete={onDelete}
            onExport={onExport}
          />
        )}

        {isOrganizer && <GuestStats stats={stats} />}

        {isOrganizer && (
          <AnalyticsPanel
            analytics={analytics}
            loading={analyticsLoading}
            selectedFilter={guestFilter}
            onSelectFilter={setGuestFilter}
          />
        )}

        {isOrganizer && (
          <GuestTable
            guests={guests}
            filter={guestFilter}
            onApprove={onApprove}
            onReject={onReject}
          />
        )}

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {event.goingCount || 0}{" "}
            {(event.goingCount || 0) === 1 ? "person is" : "people are"} going
          </p>
        </div>

        {!isOrganizer && !hideRegistration && (
          <RegistrationSection
            key={`registration-${event._id}`}
            event={event}
            myRSVP={myRSVP}
            loading={loading}
            ticketCount={ticketCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRegister={() => handleRsvpAction(ticketCount)}
            onCancel={() => onCancel?.(event._id)}
            UserProfileInfo={UserProfileInfo}
            showApprovalForm={showApprovalForm}
            setShowApprovalForm={setShowApprovalForm}
            submitApprovalRequest={submitApprovalRequest}
          />
        )}
      </div>
    </div>
  );
};

export default EventDetailsLayout;
