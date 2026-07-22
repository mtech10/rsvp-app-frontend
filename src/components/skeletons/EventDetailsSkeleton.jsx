import OrganizerPanelSkeleton from "./OrganizerPanelSkeleton";
import AnalyticsPanelSkeleton from "./AnalyticsPanelSkeleton";
import GuestTableSkeleton from "./GuestTableSkeleton";
import StatsGridSkeleton from "./StatsGridSkeleton";
import RegistrationSectionSkeleton from "./RegistrationSectionSkeleton";

export default function EventDetailsSkeleton({ mode = "public" }) {
  const isOrganizer = mode === "organizer";

  return (
    <div className="flex flex-1 flex-col overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
        <div className="h-9 w-9 animate-pulse rounded-lg bg-slate-200" />

        {!isOrganizer && (
          <div className="flex gap-2">
            <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-8 w-28 animate-pulse rounded-lg bg-slate-200" />
          </div>
        )}

        <div className="flex gap-2">
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto px-6 pb-20 pt-8 sm:px-12">
        <div className="aspect-video w-full animate-pulse rounded-xl bg-slate-200 shadow-2xl sm:mx-auto sm:max-w-100" />

        <div className="mt-10 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
          <div>
            <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
            <div className="mt-2 h-5 w-32 animate-pulse rounded bg-slate-200" />
          </div>
        </div>

        <div className="mt-5 h-9 w-3/4 animate-pulse rounded bg-slate-200" />

        <div className="mt-10 flex gap-4 rounded-3xl bg-slate-50 p-5">
          <div className="h-14 w-14 animate-pulse rounded bg-slate-200" />
          <div className="flex-1">
            <div className="h-5 w-48 animate-pulse rounded bg-slate-200" />
            <div className="mt-3 h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="hidden h-14 w-48 animate-pulse rounded-2xl bg-slate-200 sm:block" />
        </div>

        <div className="mt-8">
          <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-slate-200" />
        </div>

        {isOrganizer ? (
          <>
            <OrganizerPanelSkeleton />
            <div className="mt-8">
              <StatsGridSkeleton />
            </div>
            <AnalyticsPanelSkeleton />
            <GuestTableSkeleton />
          </>
        ) : (
          <RegistrationSectionSkeleton />
        )}
      </div>
    </div>
  );
}
