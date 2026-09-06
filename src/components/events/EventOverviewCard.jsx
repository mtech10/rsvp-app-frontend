import { CalendarDays, MapPin, Globe } from "lucide-react";
import GoogleMapEmbed from "../ui/GoogleMapEmbed";

function InfoCard({ icon: Icon, label, value, subtitle, action, actionLabel }) {
  return (
    <div className="flex min-h-[185px] flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
      <div className="mb-4 flex items-center gap-2 text-slate-500">
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>

      <div className="flex-1">
        <div className="line-clamp-3 text-lg font-semibold leading-7 text-slate-900">
          {value}
        </div>

        {subtitle && (
          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
        )}
      </div>

      {action && (
        <button
          onClick={action}
          className="mt-4 w-fit text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function Badge({ children, color }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>
      {children}
    </span>
  );
}

export default function EventOverviewCard({
  event,
  date,
  endDate,
  addressLabel,
  cityLabel,
}) {
  return (
    <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{event.title}</h1>

          <p className="mt-2 text-slate-500">
            Hosted by{" "}
            <span className="font-semibold text-slate-800">
              {event.host?.name}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge
            color={
              event.visibility === "public"
                ? "bg-green-100 text-green-700"
                : "bg-purple-100 text-purple-700"
            }
          >
            {event.visibility === "public" ? "Public" : event.visibility}
          </Badge>

          <Badge
            color={
              event.ticketType === "free"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {event.ticketType === "free" ? "Free" : event.ticketType}
          </Badge>

          <Badge color="bg-slate-100 text-slate-700">
            {event.locationType === "online" ? "Online" : "In Person"}
          </Badge>
        </div>
      </div>

      {/* Date */}

      <div className="mt-8 flex items-center gap-5 overflow-hidden">
        {/* <div className="rounded-sm p-3 bg-slate-100 border border-slate-200 text-center shadow-sm backdrop-blur-sm min-w-15">
          <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-slate-600">
            {date.month}
          </span>
          <span className="mt-1 block text-xl font-bold tracking-tight text-slate-800">
            {date.day}
          </span>
        </div> */}

        <div className="w-14 overflow-hidden rounded-xl border border-slate-200/80 bg-white text-center shadow-sm">
          <div className="bg-slate-100 py-1 border-b border-slate-200">
            <span className="block text-sm font-bold uppercase tracking-wider text-slate-500/90 leading-none">
              {date.month}
            </span>
          </div>

          <div className="py-1">
            <span className="block text-2xl font-semibold tracking-tight text-slate-700 leading-none">
              {date.day}
            </span>
          </div>
        </div>

        {/* 2. Date */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-slate-900">
            {date.weekday}, {date.month} {date.day}
          </h3>
          <p className="mt-1 text-md text-slate-600">
            {date.time} - {endDate.time}
          </p>
        </div>

        {/* 3. Location Block */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            event.address || event.venue,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex gap-3 items-center border-l border-slate-200 pl-10">
            <MapPin size={40} className="text-slate-500 shrink-0" />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-slate-900">
                {event.venue}
              </h3>
              <p className="mt-1 whitespace-pre-line leading-6 text-slate-600 text-sm">
                {event.address}
              </p>
            </div>
          </div>
        </a>
      </div>

      {/* About Event */}

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-base font-semibold text-slate-900">About Event</h2>

        <div className="mt-5 space-y-5 text-[15px] leading-8 text-slate-600">
          {event.description
            ?.split("\n")
            .filter(Boolean)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>
      </div>

      {/* Location */}

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-base font-semibold text-slate-900">Location</h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {event.venue || "Venue"}
            </h3>

            <p className="mt-2 leading-7 text-slate-600">{event.address}</p>
          </div>

          {event.locationType !== "online" && (
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                title="Google Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  event.address || event.venue,
                )}&output=embed`}
                className="h-72 w-full"
                loading="lazy"
              />

              <div className="border-t border-slate-200 bg-slate-50 px-5 py-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    event.address || event.venue,
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hosted By */}

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-base font-semibold text-slate-900">Hosted By</h2>

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:shadow-sm">
          <div className="flex items-center gap-4">
            <img
              src={
                event.host?.avatar ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  event.host?.name || "Host",
                )}`
              }
              alt={event.host?.name}
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h3 className="font-semibold text-slate-900">
                {event.host?.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">Event Organizer</p>

              <p className="mt-3 text-sm font-medium text-slate-500">
                {event.goingCount || 0} Going
              </p>
            </div>
          </div>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-50">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
