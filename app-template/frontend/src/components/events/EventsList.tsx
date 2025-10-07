import { EventCard } from './EventCard';
import { Pagination } from './Pagination';
import type { EventListItem, PaginationMeta } from '../../../../openapi/types';

interface EventsListProps {
  events: EventListItem[];
  pagination?: PaginationMeta;
  onPageChange: (page: number) => void;
}

export function EventsList({ events, pagination, onPageChange }: EventsListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No events found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
          className="mt-8"
        />
      )}
    </div>
  );
}