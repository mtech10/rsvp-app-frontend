import { Users, UserCheck, Clock3, UserX } from "lucide-react";
import StatsGrid from "../ui/StatsGrid";

export default function GuestStats({ stats }) {
  const guestcards = [
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

  return <StatsGrid cards={guestcards} />;
}
