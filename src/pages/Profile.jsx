import { useAuth } from "../context/AuthContext";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileQuickActions from "../components/profile/ProfileQuickActions";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <ProfileHeader user={user} />

      <ProfileStats hosted={0} joined={0} going={0} pending={0} />

      <ProfileQuickActions />
    </div>
  );
}
