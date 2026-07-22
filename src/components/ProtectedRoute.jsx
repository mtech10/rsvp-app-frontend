import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRouteSkeleton from "./skeletons/ProtectedRouteSkeleton";
import ProfileSkeleton from "./skeletons/ProfileSkeleton";
import CreateEventSkeleton from "./skeletons/CreateEventSkeleton";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    if (location.pathname === "/profile") {
      return (
        <ProtectedRouteSkeleton>
          <ProfileSkeleton />
        </ProtectedRouteSkeleton>
      );
    }

    if (location.pathname === "/create") {
      return (
        <ProtectedRouteSkeleton>
          <CreateEventSkeleton />
        </ProtectedRouteSkeleton>
      );
    }

    return <ProtectedRouteSkeleton />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
