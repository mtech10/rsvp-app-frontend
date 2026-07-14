import { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import EventCardItem from "../components/EventCardItem";

export default function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const { events } = await getMyEvents();
        setEvents(events);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Events</h1>

          <p className="mt-2 text-slate-500">
            Manage the events you've created.
          </p>
        </div>

        <button
          onClick={() => navigate("/create")}
          className="rounded-lg bg-black px-5 py-3 text-white hover:bg-slate-800"
        >
          + Create Event
        </button>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-12 text-center">
          <h2 className="text-xl font-semibold">No events yet</h2>

          <p className="mt-3 text-slate-500">
            Create your first event to start inviting people.
          </p>

          <button
            onClick={() => navigate("/create")}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
          >
            Create Event
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {events.map((event) => (
            <EventCardItem
              key={event._id}
              event={event}
              variant="my-events"
              onClick={() => navigate(`/my-events/${event._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
