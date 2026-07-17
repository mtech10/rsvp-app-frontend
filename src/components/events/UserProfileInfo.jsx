import { User, Mail } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function UserProfileInfo() {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";

  if (!user) return null;

  return (
    <div className="my-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-3">
        <div className="rounded-full bg-white p-3 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-semibold text-white">
            {initials}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{user.name}</h3>

          <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Mail size={14} />
            {user.email}
          </div>
        </div>
      </div>
    </div>
  );
}
