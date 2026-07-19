import { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import EventCardItem from "../components/events/EventCardItem";
import EmptyState from "../components/ui/EmptyState";
import { CalendarPlus } from "lucide-react";

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
        <EmptyState
          icon={CalendarPlus}
          title="No events yet"
          description="Create your first event to start inviting people."
          action={
            <button
              onClick={() => navigate("/create")}
              className="rounded-lg bg-black px-5 py-3 text-white transition hover:bg-slate-800"
            >
              Create Event
            </button>
          }
        />
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
