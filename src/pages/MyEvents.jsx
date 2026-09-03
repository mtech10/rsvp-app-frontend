import { useEffect, useState } from "react";
import { getMyEvents } from "../services/eventService";
import { useNavigate } from "react-router-dom";
import EventCardItem from "../components/events/EventCardItem";
import EmptyState from "../components/ui/EmptyState";
import { CalendarPlus } from "lucide-react";
import SectionHeader from "../components/ui/SectionHeader";
import OrganizerDashboardHeader from "../components/events/OrganizerDashboardHeader";
import DashboardStats from "../components/events/DashboardStats";
import Toolbar from "../components/Toolbar";
import EventCardSkeleton from "../components/skeletons/EventCardSkeleton";

export default function MyEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

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
    return (
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <EventCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  const totalEvents = events.length;

  const totalGuests = events.reduce(
    (sum, event) => sum + (event.totalGuests || 0),
    0,
  );

  const pendingGuests = events.reduce(
    (sum, event) => sum + (event.pendingGuests || 0),
    0,
  );

  const cancelledGuests = events.reduce(
    (sum, event) => sum + (event.cancelledGuests || 0),
    0,
  );

  const filteredEvents = [...events]
    .filter((event) => {
      const searchTerm = search.toLowerCase();

      return (
        event.title?.toLowerCase().includes(searchTerm) ||
        event.city?.toLowerCase().includes(searchTerm) ||
        event.ticketType?.toLowerCase().includes(searchTerm)
      );
    })

    .filter((event) => {
      switch (filter) {
        case "free":
          return event.ticketType?.toLowerCase() === "free";

        case "paid":
          return event.ticketType?.toLowerCase() === "paid";

        case "approval":
          return event.requireApproval;

        default:
          return true;
      }
    })

    .sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);

        case "title":
          return a.title.localeCompare(b.title);

        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

  // return (
  //   <div className="mx-auto max-w-5xl">
  //     {events.length === 0 ? (
  //       <EmptyState
  //         title="No Upcoming Events"
  //         description="You have no upcoming events. Why not host one?"
  //         actionText="Create Event"
  //         actionTo="/create"
  //       />
  //     ) : (
  //       <>
  //         <OrganizerDashboardHeader
  //           totalEvents={events.length}
  //           onCreateEvent={() => navigate("/create")}
  //         />

  //         <Toolbar
  //           search={search}
  //           setSearch={setSearch}
  //           filter={filter}
  //           setFilter={setFilter}
  //           sort={sort}
  //           setSort={setSort}
  //         />

  //         <DashboardStats
  //           totalEvents={totalEvents}
  //           totalGuests={totalGuests}
  //           pendingGuests={pendingGuests}
  //           cancelledGuests={cancelledGuests}
  //         />

  //         {filteredEvents.length === 0 ? (
  //           <EmptyState
  //             title="No Matching Events"
  //             description="Try a different search term."
  //           />
  //         ) : (
  //           <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
  //             {filteredEvents.map((event) => (
  //               <EventCardItem
  //                 key={event._id}
  //                 event={event}
  //                 variant="my-events"
  //                 onClick={() => navigate(`/my-events/${event._id}`)}
  //               />
  //             ))}
  //           </div>
  //         )}
  //       </>
  //     )}

  //     {filteredEvents.length === 0 ? (
  //       <EmptyState
  //         title={
  //           events.length === 0 ? "No Upcoming Events" : "No Matching Events"
  //         }
  //         description={
  //           events.length === 0
  //             ? "You have no upcoming events. Why not host one?"
  //             : "Try a different search term."
  //         }
  //         actionText={events.length === 0 ? "Create Event" : undefined}
  //         actionTo={events.length === 0 ? "/create" : undefined}
  //       />
  //     ) : (
  //       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
  //         {filteredEvents.map((event) => (
  //           <EventCardItem
  //             key={event._id}
  //             event={event}
  //             variant="my-events"
  //             onClick={() => navigate(`/my-events/${event._id}`)}
  //           />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="mx-auto max-w-5xl">
      {events.length === 0 ? (
        <EmptyState
          title="No Upcoming Events"
          description="You have no upcoming events. Why not host one?"
          actionText="Create Event"
          actionTo="/create"
        />
      ) : (
        <>
          <OrganizerDashboardHeader
            totalEvents={events.length}
            onCreateEvent={() => navigate("/create")}
          />

          <Toolbar
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
          />

          <DashboardStats
            totalEvents={totalEvents}
            totalGuests={totalGuests}
            pendingGuests={pendingGuests}
            cancelledGuests={cancelledGuests}
          />

          {filteredEvents.length === 0 ? (
            <EmptyState
              title="No Matching Events"
              description="Try a different search term."
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
              {filteredEvents.map((event) => (
                <EventCardItem
                  key={event._id}
                  event={event}
                  variant="my-events"
                  onClick={() => navigate(`/my-events/${event._id}`)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
