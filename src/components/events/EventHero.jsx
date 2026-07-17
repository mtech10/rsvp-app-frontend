import { CalendarDays, MapPin } from "lucide-react";

export default function EventHero({ event }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="h-72 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500" />

      <div className="space-y-5 p-8">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
          {event.category}
        </span>

        <h1 className="text-4xl font-bold">{event.title}</h1>

        <div className="flex flex-wrap gap-6 text-slate-500">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            {event.date}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {event.location}
          </div>
        </div>
      </div>
    </div>
  );
}
