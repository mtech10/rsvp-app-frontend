import EventForm from "../components/events/EventForm";
import PageTransition from "../components/ui/PageTransition";

export default function CreateEvent() {
  return (
    <>
      <PageTransition>
        <EventForm mode="create" />;
      </PageTransition>
    </>
  );
}
