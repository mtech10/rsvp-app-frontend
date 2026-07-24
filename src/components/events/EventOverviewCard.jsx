import { CalendarDays, MapPin, Users, Ticket, Globe } from "lucide-react";

function InfoCard({ icon: Icon, label, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:shadow-sm">
      <div className="mb-3 flex items-center gap-2 text-slate-500">
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>

      <h4 className="text-lg font-semibold text-slate-900">{value}</h4>

      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
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
            {event.visibility}
          </Badge>

          <Badge
            color={
              event.ticketType === "free"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }
          >
            {event.ticketType}
          </Badge>

          <Badge color="bg-slate-100 text-slate-700">
            {event.locationType === "online" ? "Online" : "In Person"}
          </Badge>
        </div>
      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          icon={CalendarDays}
          label="Date"
          value={`${date.weekday}, ${date.month} ${date.day}`}
          subtitle={`${date.time} - ${endDate.time}`}
        />

        <InfoCard
          icon={MapPin}
          label="Location"
          value={addressLabel}
          subtitle={cityLabel}
        />

        <InfoCard
          icon={Users}
          label="Guests"
          value={event.goingCount || 0}
          subtitle="Registered attendees"
        />

        <InfoCard
          icon={Ticket}
          label="Capacity"
          value={event.capacity || "Unlimited"}
          subtitle={
            event.capacity
              ? `${event.capacity - (event.goingCount || 0)} seats left`
              : "No attendee limit"
          }
        />
      </div>
    </div>
  );
}
