import { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";

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
      <h1 className="mb-8 text-3xl font-bold">My Events</h1>

      {events.length === 0 ? (
        <p>You haven't created any events yet.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event._id} className="rounded-xl border p-5 shadow-sm">
              <h2 className="text-xl font-semibold">{event.title}</h2>

              <p>{event.description}</p>

              <p>{new Date(event.startAt).toLocaleString()}</p>

              <p>{event.visibility}</p>

              <p>{event.ticketType}</p>
              <button onClick={() => navigate(`/my-events/${event._id}`)}>
                Manage
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
