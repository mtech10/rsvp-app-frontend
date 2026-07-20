import {
  MapPin,
  ChevronsRight,
  Copy,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
  Building2,
  UserCheck,
  Hash,
  Minus,
  Plus,
  X,
  CalendarPlus,
  Share2,
  Ticket,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDateParts } from "../../utility/dateUtility";
import { useNavigate } from "react-router-dom";
import { getMyRSVP } from "../../services/rsvpService";
import OrganizerPanel from "./OrganizerPanel";
import GuestStats from "./GuestStats";
import RegistrationCard from "./RegistrationCard";
import UserProfileInfo from "./UserProfileInfo";
import GuestTable from "./GuestTable";

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
  const [loading, setLoading] = useState(false);

  const ticketType = event.ticketType?.toLowerCase().trim() || "";
  const isRegistration = ticketType === "registration";
  const isApprovalRequired =
    ticketType.includes("approval") || event.requireApproval;
  const isFree = ticketType === "free";
  const isPaid = ticketType === "paid";
  const isPaidOrRegistration = isPaid || isRegistration;

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

          {isOrganizer && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Analytics</h2>

              <p className="text-slate-500">
                Event insights and attendance analytics are coming soon.
              </p>
            </div>
          )}

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

          {myRSVP ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                {myRSVP?.status === "going" ? (
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                ) : (
                  <RegistrationCard
                    event={event}
                    ticketCount={ticketCount}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onRegister={() => handleRsvpAction(ticketCount)}
                    loading={loading}
                    UserProfileInfo={UserProfileInfo}
                    setShowApprovalForm={setShowApprovalForm}
                  />
                )}
                <div>
                  <h4 className="text-2xl font-semibold">
                    {myRSVP?.status === "going"
                      ? "You're Going"
                      : "Request Pending"}
                  </h4>

                  <p className="text-sm text-slate-500">{event.title}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <Ticket className="h-5 w-5 text-slate-500" />
                  <span>{myRSVP?.tickets || 1} Ticket(s)</span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50">
                  <CalendarPlus size={18} />
                  Add to Calendar
                </button>

                <button className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-50">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
              <button
                onClick={() => onCancel?.(event._id)}
                className="mt-6 text-sm font-medium border px-4 py-2 rounded-lg text-red-600 hover:text-red-700"
              >
                Cancel Registration
              </button>
            </div>
          ) : (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="bg-slate-50 px-5 py-3 text-sm font-medium text-slate-600">
                Registration
              </div>
              <div className="px-5 pb-5">
                {isApprovalRequired ? (
                  <>
                    <div className="flex items-start gap-3 border-b border-slate-100 py-4">
                      <div className="rounded-full bg-slate-100 p-2 text-slate-600">
                        <UserCheck size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900">
                          Approval Required
                        </span>
                        <span className="text-sm text-slate-500">
                          Your registration is subject to host approval.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-900">
                        <Hash size={18} className="text-slate-400" /> Tickets
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handleDecrement}
                          className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-4 text-center font-semibold text-slate-900">
                          {ticketCount}
                        </span>
                        <button
                          onClick={handleIncrement}
                          className="rounded-md bg-slate-50 p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <UserProfileInfo />
                    <button
                      onClick={() => setShowApprovalForm(true)}
                      className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
                    >
                      Request to Join
                    </button>
                  </>
                ) : isFree ? (
                  <>
                    <p className="mt-4 text-sm text-slate-700">
                      Welcome, Ademola Olusegun! To join the event, please
                      register below.
                    </p>

                    <UserProfileInfo />

                    <button
                      disabled={loading}
                      onClick={() => handleRsvpAction(ticketCount)}
                      className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-50"
                    >
                      {loading ? "Registering..." : "One-Click RSVP"}
                    </button>
                  </>
                ) : isPaidOrRegistration ? (
                  <>
                    <p className="mt-4 text-sm text-slate-700">
                      Welcome, Ademola Olusegun! To join the event, please
                      register below.
                    </p>

                    <UserProfileInfo />

                    <button
                      onClick={() => handleRsvpAction(ticketCount)}
                      className="mt-2 w-full rounded-xl bg-[#2C2C2C] py-3 text-sm font-bold text-white transition hover:bg-black"
                    >
                      Register
                    </button>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-slate-700">
                    This event requires registration. Please contact the host
                    for details.
                  </p>
                )}
              </div>
            </div>
          )}

          {myRSVP?.status === "pending" && (
            <div className="mt-12 rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
              <h3 className="text-xl font-bold text-yellow-700">
                Pending Approval
              </h3>

              <p className="mt-2 text-slate-700">
                Your registration is waiting for the organizer's approval.
              </p>
            </div>
          )}

          {myRSVP?.status === "rejected" && (
            <div className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6">
              <h3 className="text-xl font-bold text-red-700">
                Registration Declined
              </h3>

              <p className="mt-2 text-slate-700">
                The organizer declined your request.
              </p>
            </div>
          )}

          {showApprovalForm && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">
                    Complete Registration
                  </h3>
                  <button
                    onClick={() => setShowApprovalForm(false)}
                    className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={submitApprovalRequest}>
                  <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Additional Information
                    </label>
                    <textarea
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      rows="3"
                      placeholder="Why would you like to attend?"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
                  >
                    Submit Request
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EventDetailsLayout;
