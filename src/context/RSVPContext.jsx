import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { getEvent } from "../services/eventService";

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

  const [rsvpEvents, setRsvpEvents] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "rsvpRegistrations",
        JSON.stringify(registrations),
      );
    }
  }, [registrations]);

  const refreshRsvpEvents = useCallback(async () => {
    if (!registrations.length) {
      setRsvpEvents([]);
      return;
    }

    const freshEvents = await Promise.all(
      registrations.map(async (registration) => {
        const eventId =
          registration.event?._id ||
          registration.event?.id ||
          registration.event?.api_id;

        if (!eventId) return null;

        try {
          const data = await getEvent(eventId);
          const event = data?.event || data;

          if (!event) return null;

          return {
            ...event,
            myRSVP: registration.rsvp,
          };
        } catch (error) {
          console.error(`Failed to refresh RSVP event ${eventId}:`, error);

          return null;
        }
      }),
    );

    setRsvpEvents(freshEvents.filter(Boolean));
  }, [registrations]);

  useEffect(() => {
    refreshRsvpEvents();
  }, [refreshRsvpEvents]);

  const addRsvp = (event, rsvp) => {
    setRegistrations((current) => {
      const eventId = event?._id || event?.id || event?.api_id;

      const existing = current.find((registration) => {
        const registrationEventId =
          registration.event?._id ||
          registration.event?.id ||
          registration.event?.api_id;

        return registrationEventId === eventId;
      });

      if (existing) {
        return current.map((registration) => {
          const registrationEventId =
            registration.event?._id ||
            registration.event?.id ||
            registration.event?.api_id;

          if (registrationEventId !== eventId) {
            return registration;
          }

          return {
            ...registration,
            event,
            rsvp,
          };
        });
      }

      return [
        ...current,
        {
          event,
          rsvp,
        },
      ];
    });
  };

  const cancelRsvp = (eventId) => {
    setRegistrations((current) =>
      current.filter((registration) => {
        const id =
          registration.event?._id ||
          registration.event?.id ||
          registration.event?.api_id;

        return id !== eventId;
      }),
    );

    setRsvpEvents((current) =>
      current.filter((event) => {
        const id = event?._id || event?.id || event?.api_id;
        return id !== eventId;
      }),
    );
  };

  return (
    <RSVPContext.Provider
      value={{
        rsvpEvents,
        addRsvp,
        cancelRsvp,
        refreshRsvpEvents,
      }}
    >
      {children}
    </RSVPContext.Provider>
  );
};

export const useRSVP = () => {
  const ctx = useContext(RSVPContext);

  if (!ctx) {
    throw new Error("useRSVP must be used inside RSVPProvider");
  }

  return ctx;
};
