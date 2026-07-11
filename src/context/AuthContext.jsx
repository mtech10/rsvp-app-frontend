import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user, token) => {
    localStorage.setItem("token", token);

    setUser(user);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    async function loadUser() {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        setLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser(savedToken);

        setUser(user);
        setToken(savedToken);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
