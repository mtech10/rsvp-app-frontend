import { User, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../ui/Avatar";

export default function UserProfileInfo() {
  const { user } = useAuth();

  return <Avatar name={user.name} size="xl" />;
}
