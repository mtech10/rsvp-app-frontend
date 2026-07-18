import { User, CalendarDays, Pencil } from "lucide-react";

export default function ProfileHeader({ user }) {
  if (!user) return null;

  const initials = user.name
    ?.split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-center md:text-left">
        {/* Avatar */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-slate-800">
          {initials || <User size={40} />}
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>

          <p className="mt-1 text-slate-500">{user.email}</p>

          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 md:justify-start">
            <CalendarDays size={16} />
            <span>Member since {joinedDate}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          disabled
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
