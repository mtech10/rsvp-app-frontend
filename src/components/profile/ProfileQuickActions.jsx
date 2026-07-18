import { CalendarPlus, Calendar, Compass, Bell } from "lucide-react";

import QuickActions from "../ui/QuickActions";

export default function ProfileQuickActions() {
  const actions = [
    {
      label: "Create Event",
      description: "Organize a new event",
      to: "/create",
      icon: CalendarPlus,
    },
    {
      label: "My Events",
      description: "Manage your hosted events",
      to: "/my-events",
      icon: Calendar,
    },
    {
      label: "Discover Events",
      description: "Find events around you",
      to: "/discover",
      icon: Compass,
    },
    {
      label: "Calendar",
      description: "View upcoming events",
      to: "/calendars",
      icon: Calendar,
    },
  ];

  return <QuickActions actions={actions} />;
}
