import { CalendarDays, Users, CheckCircle, Clock3 } from "lucide-react";

import StatsGrid from "../ui/StatsGrid";

export default function ProfileStats({
  hosted = 0,
  joined = 0,
  going = 0,
  pending = 0,
}) {
  const profilecards = [
    {
      label: "Hosted",
      value: hosted,
      icon: CalendarDays,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      label: "Joined",
      value: joined,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Going",
      value: going,
      icon: CheckCircle,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      label: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
  ];

  return <StatsGrid cards={profilecards} />;
}
