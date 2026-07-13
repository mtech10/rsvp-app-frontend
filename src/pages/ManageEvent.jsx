import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";

export default function ManageEvent() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await getEvent(id);
        setEvent(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>{event.title}</h1>
    </div>
  );
}
