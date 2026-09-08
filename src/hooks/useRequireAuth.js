// src/hooks/useRequireAuth.js

import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useRequireAuth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const requireAuth = useCallback(
    (action) => {
      if (loading) return false;

      if (!user) {
        const returnTo = location.pathname + location.search + location.hash;

        navigate(`/login?returnTo=${encodeURIComponent(returnTo)}`);

        return false;
      }

      if (typeof action === "function") {
        action();
      }

      return true;
    },
    [user, loading, navigate, location],
  );

  return {
    user,
    loading,
    isAuthenticated: Boolean(user),
    requireAuth,
  };
}
