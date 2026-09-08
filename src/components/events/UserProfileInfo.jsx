import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function UserProfileInfo() {
  const { user } = useAuth();

  const userName = user?.name || "Guest";

  return <Avatar name={userName} size="xl" />;
}
