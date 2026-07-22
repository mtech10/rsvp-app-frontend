import EventCardSkeleton from "./EventCardSkeleton";

export default function DiscoverSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}
