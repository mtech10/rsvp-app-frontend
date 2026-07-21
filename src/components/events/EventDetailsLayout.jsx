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
import { useNavigate } from "react-router-dom";
import { getMyRSVP } from "../../services/rsvpService";
import OrganizerPanel from "./OrganizerPanel";
import GuestStats from "./GuestStats";
import UserProfileInfo from "./UserProfileInfo";
import GuestTable from "./GuestTable";
import RegistrationSection from "./RegistrationSection";
import { getEventAnalytics } from "../../services/eventService";
import AnalyticsPanel from "./AnalyticsPanel";

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
}) => {
  const [ticketCount, setTicketCount] = useState(1);
  const [showApprovalForm, setShowApprovalForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (mode !== "organizer") return;

    async function loadAnalytics() {
      try {
        const { analytics } = await getEventAnalytics(event._id);
        setAnalytics(analytics);
      } catch (error) {
        console.error(error);
      }
    }

    loadAnalytics();
  }, [event._id, mode]);

  if (!event) return null;

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

  const ticketType = event.ticketType?.toLowerCase().trim() || "";

  const handleRsvpAction = async (tickets = 1) => {
    try {
      setLoading(true);

      await onRsvp?.(tickets);
    } finally {
      setLoading(false);
    }
  };

  const submitApprovalRequest = (e) => {
    e.preventDefault();
    onRsvp(ticketCount);
    setShowApprovalForm(false);
    onClose?.();
  };

  return (
    <>
      <div className="flex flex-1 w-full flex-col overflow-hidden bg-white">
        <div className="z-10 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
          <button
            onClick={() => onClose?.()}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <ChevronsRight size={20} />
          </button>
          {!isOrganizer && (
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                <Copy size={14} /> Copy Link
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
                Event Page <ArrowUpRight size={14} />
              </button>
            </div>
          )}

          <div className="flex items-center gap-1 text-slate-400">
            <button
              className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600"
              onClick={() => onNavigate("prev")}
            >
              <ChevronUp size={20} />
            </button>
            <button
              className="rounded-lg p-1.5 transition hover:bg-slate-100 hover:text-slate-600"
              onClick={() => onNavigate("next")}
            >
              <ChevronDown size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20 pt-8 sm:px-12">
          <div className="relative flex justify-center">
            <img
              src={event.coverUrl}
              alt={`${event.title} event cover`}
              loading="lazy"
              className="h-full w-full object-cover shadow-2xl transition duration-300 hover:scale-105 rounded-xl sm:w-100"
            />
          </div>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 font-semibold">
              {event.host?.name?.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-slate-500">Hosted by</p>

              <p className="font-semibold">{event.host?.name}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold text-slate-900">{event.title}</h3>
          </div>

          <div className="mt-10 flex justify-between gap-4 sm:items-center rounded-3xl bg-slate-50">
            <div className="flex gap-3">
              <div className="rounded-sm p-1 bg-slate-100  border border-slate-200 text-center shadow-sm backdrop-blur-sm">
                <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 ">
                  {date.month}
                </span>
                <span className="mt-1 text-xl font-bold tracking-tight text-slate-800">
                  {date.day}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-slate-900">
                  {date.weekday}, {date.month} {date.day}
                </span>
                <span className="mt-1 text-sm  text-slate-600">
                  {date.time} - {endDate.time}
                </span>
              </div>
            </div>

            <div className="flex gap-2 items-center rounded-3xl bg-slate-50 p-5">
              <MapPin size={30} />
              <div className="flex flex-col">
                <span className="mt-2 text-sm text-slate-900 font-semibold">
                  {addressLabel}
                </span>
                <span className="mt-1 text-base  text-slate-600">
                  {cityLabel}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <p className="text-slate-600 text-md">About Event</p>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-900">
              {event.description}
            </p>
          </div>

          {isOrganizer && <OrganizerPanel event={event} onDelete={onDelete} />}

          {isOrganizer && <GuestStats stats={stats} />}

          {isOrganizer && <AnalyticsPanel analytics={analytics} />}

          {isOrganizer && (
            <GuestTable
              guests={guests}
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

          <RegistrationSection
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
        </div>
      </div>
    </>
  );
};

export default EventDetailsLayout;
