import { useState } from 'react';
import { useListEvents } from '@/apis/events';
import { EventsList } from '@/components/events/EventsList';
import { EventFilters } from '@/components/events/EventFilters';
import { Container } from '@/components';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import type { ListEventsParams } from '../../../openapi/types';

export function Events() {
  const [filters, setFilters] = useState<ListEventsParams>({
    page: 1,
    limit: 25,
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const { data, isLoading, error } = useListEvents(filters);

  const handleFilterChange = (newFilters: Partial<ListEventsParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1 // Reset to page 1 when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({
      ...prev,
      page
    }));
  };

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Events</h1>
        <p className="text-muted-foreground">
          Browse and manage upcoming events
        </p>
      </div>

      <EventFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        className="mb-6"
      />

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>
            Failed to load events. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <EventsList
          events={data?.data.data || []}
          pagination={data?.data.pagination}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
}