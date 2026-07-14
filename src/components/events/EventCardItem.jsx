import React from "react";

const formatEventDate = (value) => {
  if (!value) return "TBD";

  const date = new Date(value);
  const today = new Date();
  const midnight = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((midnight(date) - midnight(today)) / 86_400_000);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

  if (diffDays === 1) return `Tomorrow, ${time}`;
  if (diffDays === 0) return `Today, ${time}`;

  const dayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);

  return `${dayLabel}, ${time}`;
};

const EventCardItem = ({
  event,
  selected,
  onClick,
  variant = "discover",
  onManage,
}) => {
  const dateText = formatEventDate(event.startAt);
  const address =
    event.address || event.venue || "Location details coming soon";
  const city =
    event.city ||
    (event.locationType === "online" ? "Online" : "Various locations");

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full overflow-hidden rounded-xl border p-0 text-left transition cursor-pointer hover:-translate-y-0.5 hover:shadow-lg ${
        selected ? "border-indigo-500 shadow-lg" : "border-slate-200 bg-white"
      }`}
    >
      <div className="relative  w-32 overflow-hidden  sm:w-32 shrink-0">
        <img
          src={event.coverUrl || "https://placehold.co/600x400?text=Event"}
          alt={event.title}
          className=" h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
            {dateText}
          </p>
          <h3 className="mt-2 text-base font-semibold text-slate-900 line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{address}</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            {event.rsvpCount || 0} attending
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500">
          {variant === "discover" && (
            <span>{event.rsvpCount || 0} attending</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default EventCardItem;
