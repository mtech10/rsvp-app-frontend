import { Users, UserCheck, Clock3, MapPin } from "lucide-react";

export default function EventStats({
  totalGuests,
  approvedGuests,
  pendingGuests,
  location,
}) {
  const stats = [
    {
      title: "Guests",
      value: totalGuests,
      icon: Users,
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Going",
      value: approvedGuests,
      icon: UserCheck,
      color: "text-green-600 bg-green-100",
    },
    {
      title: "Pending",
      value: pendingGuests,
      icon: Clock3,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      title: "Location",
      value: location,
      icon: MapPin,
      color: "text-purple-600 bg-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}
            >
              <Icon size={22} />
            </div>

            <p className="text-sm text-slate-500">{stat.title}</p>

            <h3 className="mt-1 truncate text-xl font-bold text-slate-900">
              {stat.value}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
