import { useSearchParams } from "react-router-dom";
import EventForm from "../components/events/EventForm";

export default function CreateEvent() {
  const [searchParams] = useSearchParams();

  const duplicateId = searchParams.get("duplicate");

  return <EventForm mode="create" duplicateId={duplicateId} />;
}
