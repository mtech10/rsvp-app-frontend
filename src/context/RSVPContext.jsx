import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getEventById } from "../data";

const RSVPContext = createContext(null);

export const RSVPProvider = ({ children }) => {
  const [registrations, setRegistrations] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(window.localStorage.getItem("rsvpRegistrations")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "rsvpRegistrations",
        JSON.stringify(registrations),
      );
    }
  }, [registrations]);

  const addRsvp = (registrationData) => {
    setRegistrations((current) => {
      if (current.find((r) => r.api_id === registrationData.api_id))
        return current;
      return [...current, registrationData];
    });
  };

  const cancelRsvp = (api_id) => {
    setRegistrations((current) => current.filter((r) => r.api_id !== api_id));
  };

  const rsvpEvents = useMemo(() => {
    return registrations
      .map((reg) => {
        const eventData = getEventById(reg.api_id);
        if (!eventData) return null;
        return { ...eventData, ...reg };
      })
      .filter(Boolean);
  }, [registrations]);

  return (
    <RSVPContext.Provider value={{ rsvpEvents, addRsvp, cancelRsvp }}>
      {children}
    </RSVPContext.Provider>
  );
};

export const useRSVP = () => {
  const ctx = useContext(RSVPContext);
  if (!ctx) throw new Error("useRSVP must be used inside RSVPProvider");
  return ctx;
};
