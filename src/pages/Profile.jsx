import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRSVP } from "../context/RSVPContext";
import { getMyEvents } from "../services/eventService";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileQuickActions from "../components/profile/ProfileQuickActions";

export default function Profile() {
  const { user } = useAuth();
  const { rsvpEvents } = useRSVP();
  const [hostedCount, setHostedCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    async function loadHostedEvents() {
      try {
        const { events = [] } = await getMyEvents();

        if (isActive) {
          setHostedCount(events.length);
        }
      } catch (error) {
        console.error("LOAD PROFILE EVENTS ERROR:", error);
      }
    }

    if (user) {
      loadHostedEvents();
    }

    return () => {
      isActive = false;
    };
  }, [user]);

  const joinedCount = rsvpEvents.length;
  const goingCount = rsvpEvents.filter(
    (event) => event.myRSVP?.status === "going",
  ).length;
  const pendingCount = rsvpEvents.filter(
    (event) => event.myRSVP?.status === "pending",
  ).length;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <ProfileHeader user={user} />

      <ProfileStats
        hosted={hostedCount}
        joined={joinedCount}
        going={goingCount}
        pending={pendingCount}
      />

      <ProfileQuickActions />
    </div>
  );
}
