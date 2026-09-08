// // import React from "react";

// // import Category from "../components/Category";
// // import EventCards from "../components/events/EventCards";
// // import RecommendedEvents from "../components/events/RecommendedEvents";

// // export default function DiscoverEvents() {
// //   return (
// //     <section className="mx-auto max-w-6xl px-6 py-8">
// //       <div>
// //         <span className="text-sm font-medium text-slate-400">Discover</span>

// //         <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
// //           Find your next experience
// //         </h1>

// //         <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
// //           Explore events by category and discover experiences worth showing up
// //           for.
// //         </p>
// //       </div>

// //       <div className="mt-10">
// //         <Category />
// //       </div>

// //       <RecommendedEvents />

// //       <div className="mt-16">
// //         <div className="mb-6 flex items-end justify-between gap-4">
// //           <div>
// //             <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
// //               Upcoming events
// //             </h2>

// //             <p className="mt-1 text-sm text-slate-400">
// //               Discover what's happening next.
// //             </p>
// //           </div>
// //         </div>

// //         <EventCards />
// //       </div>
// //     </section>
// //   );
// // }

// // DiscoverEvents.jsx

// import React from "react";

// import Category from "../components/Category";
// import EventCards from "../components/events/EventCards";
// import RecommendedEvents from "../components/events/RecommendedEvents";
// import { useAuth } from "../context/AuthContext";

// export default function DiscoverEvents() {
//   const { user } = useAuth();

//   return (
//     <section className="mx-auto max-w-6xl px-6 py-8">
//       <div>
//         <span className="text-sm font-medium text-slate-400">Discover</span>

//         <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
//           Find your next experience
//         </h1>

//         <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
//           Explore events by category and discover experiences worth showing up
//           for.
//         </p>
//       </div>

//       <div className="mt-10">
//         <Category />
//       </div>

//       {user && <RecommendedEvents />}

//       <div className="mt-16">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
//               Upcoming events
//             </h2>

//             <p className="mt-1 text-sm text-slate-400">
//               Discover what's happening next.
//             </p>
//           </div>
//         </div>

//         <EventCards />
//       </div>
//     </section>
//   );
// }

// DiscoverEvents.jsx

import React, { useEffect, useState } from "react";

import Category from "../components/Category";
import EventCards from "../components/events/EventCards";
import RecommendedEvents from "../components/events/RecommendedEvents";
import { useAuth } from "../context/AuthContext";
import { getEvents } from "../services/eventService";

export default function DiscoverEvents() {
  const { user } = useAuth();

  const [recommendedEvents, setRecommendedEvents] = useState([]);

  useEffect(() => {
    if (!user) {
      setRecommendedEvents([]);
      return;
    }

    async function loadRecommendedEvents() {
      try {
        /*
         * Until there is a dedicated recommendation endpoint,
         * use upcoming events as the recommendation source.
         */
        const data = await getEvents({
          date: "upcoming",
        });

        setRecommendedEvents(data?.events || []);
      } catch (error) {
        console.error("LOAD RECOMMENDED EVENTS ERROR:", error);
        setRecommendedEvents([]);
      }
    }

    loadRecommendedEvents();
  }, [user]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div>
        <span className="text-sm font-medium text-slate-400">Discover</span>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Find your next experience
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
          Explore events by category and discover experiences worth showing up
          for.
        </p>
      </div>

      <div className="mt-10">
        <Category />
      </div>

      {user && <RecommendedEvents events={recommendedEvents} />}

      <div className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Upcoming events
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Discover what's happening next.
            </p>
          </div>
        </div>

        <EventCards />
      </div>
    </section>
  );
}
