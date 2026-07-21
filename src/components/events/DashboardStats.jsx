import { CalendarDays, Users, Clock3, Ban } from "lucide-react";

export default function DashboardStats({
  totalEvents,
  totalGuests,
  pendingGuests,
  cancelledGuests,
}) {
  const cards = [
    {
      title: "Events",
      value: totalEvents,
      icon: CalendarDays,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Guests",
      value: totalGuests,
      icon: Users,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: pendingGuests,
      icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      title: "Cancelled",
      value: cancelledGuests,
      icon: Ban,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h2 className="mt-2 text-4xl font-bold text-slate-900">
                  {card.value}
                </h2>
              </div>

              <div className={`rounded-2xl p-4 ${card.color}`}>
                <Icon size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
