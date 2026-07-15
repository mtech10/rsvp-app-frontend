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
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatDateParts } from "../../utility/dateUtility";
import { createRSVP } from "../../services/rsvpService";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/eventService";
import { getMyRSVP } from "../../services/rsvpService";

const EventDetailsLayout = ({
  event,
  myRSVP,
  events = [],
  guests = [],
  onRsvp,
  onClose,
  onNavigate,
  onCancel,
  isRsvpView = false,
  mode = "public",
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

  const UserProfileInfo = () => (
    <div className="flex items-center gap-3 py-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
        OA
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-slate-900">
          OYELUSI ADEMOLA OLUSEGUN
        </span>
        <span className="text-sm text-slate-500">
          oyelusiaomichael1009@gmail.com
        </span>
      </div>
    </div>
  );

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

      const response = await createRSVP(event._id, tickets);

      alert(response.message);

      onClose?.();
    } catch (error) {
      alert(error.message);
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
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmed) return;

    try {
      await deleteEvent(event._id);

      alert("Event deleted successfully.");

      navigate("/my-events");
    } catch (error) {
      alert(error.message);
    }
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

          {isOrganizer && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-slate-900">
                Organizer Actions
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/my-events/${event._id}/edit`)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  ✏️ Edit Event
                </button>

                <button
                  onClick={handleDelete}
                  className="w-full rounded-xl border border-red-200 px-4 py-3 text-left text-red-600 transition hover:bg-red-50"
                >
                  🗑 Delete Event
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-lg font-semibold">Event Settings</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Visibility</span>
                <span className="font-medium capitalize">
                  {event.visibility}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Ticket</span>
                <span className="font-medium capitalize">
                  {event.ticketType}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Capacity</span>
                <span className="font-medium">
                  {event.capacity || "Unlimited"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Timezone</span>
                <span className="font-medium">{event.timezone}</span>
              </div>
            </div>
          </div>

          {isOrganizer && (
            <div className="space-y-3">
              {guests.length === 0 ? (
                <p className="text-sm text-slate-500">No guests yet.</p>
              ) : (
                guests.map((guest) => (
                  <div
                    key={guest._id}
                    className="flex items-center justify-between rounded-xl border p-4"
                  >
                    <div>
                      <h4 className="font-semibold">{guest.user?.name}</h4>

                      <p className="text-sm text-slate-500">
                        {guest.user?.email}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          guest.status === "going"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {guest.status}
                      </span>

                      <p className="mt-1 text-xs text-slate-500">
                        {guest.tickets} ticket(s)
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {isOrganizer && (
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold">Analytics</h2>

              <p className="text-slate-500">
                Event insights and attendance analytics are coming soon.
              </p>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              {event.rsvp_count || 0} people going
            </p>
          </div>

          {isRsvpView ? (
            <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h4 className="text-3xl  text-slate-900">You're In</h4>
              <p className="text-xl text-slate-500">Ticket: {event.title}</p>
              <div className="flex gap-1">
                <p className="text-md text-slate-900">
                  No longer able to attend? Notify the host by
                </p>
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    onCancel?.(event._id);
                    onClose?.();
                  }}
                  className="text-rose-700 hover:border-b cursor-pointer"
                >
                  canceling your registration.
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div
                  className={`px-4 py-1.5 rounded-full text-sm font-bold 
            ${event.status === "going" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {event.status === "going" ? "Going" : "Pending Approval"}
                </div>
                <p className="text-sm text-slate-600">
                  {event.tickets || 1} ticket(s) booked
                </p>
              </div>
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

          {myRSVP?.status === "going" && (
            <div className="mt-12 rounded-2xl border border-green-200 bg-green-50 p-6">
              <h3 className="text-xl font-bold text-green-700">
                ✅ You're Going
              </h3>

              <p className="mt-2 text-slate-700">Tickets: {myRSVP.tickets}</p>

              <button
                onClick={() => onCancel?.(event._id)}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-white"
              >
                Cancel RSVP
              </button>
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
