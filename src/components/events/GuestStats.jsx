import { Users, UserCheck, Clock3, UserX } from "lucide-react";

export default function GuestStats({ stats }) {
  const cards = [
    {
      label: "Total Guests",
      value: stats.totalGuests,
      icon: Users,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
    {
      label: "Approved",
      value: stats.approvedGuests,
      icon: UserCheck,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Pending",
      value: stats.pendingGuests,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      label: "Rejected",
      value: stats.rejectedGuests,
      icon: UserX,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {card.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${card.bg}`}>
                <Icon size={22} className={card.color} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
