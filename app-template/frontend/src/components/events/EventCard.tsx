import { format } from 'date-fns';
import { Calendar, MapPin, Users, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { EventListItem } from '../../../../openapi/types';

interface EventCardProps {
  event: EventListItem;
}

const statusColors = {
  draft: 'bg-gray-500',
  published: 'bg-green-500',
  closed: 'bg-red-500',
  archived: 'bg-yellow-500'
};

const registrationColors = {
  open: 'bg-blue-500',
  closed: 'bg-gray-500'
};

export function EventCard({ event }: EventCardProps) {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);

  const formattedDateRange = startDate.toDateString() === endDate.toDateString()
    ? format(startDate, 'MMM d, yyyy')
    : `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d, yyyy')}`;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg line-clamp-2">{event.name}</CardTitle>
          <div className="flex items-center gap-1">
            {event.visibility === 'private' ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge
            variant="secondary"
            className={`${statusColors[event.status]} text-white`}
          >
            {event.status}
          </Badge>
          <Badge
            variant="secondary"
            className={`${registrationColors[event.registrationStatus]} text-white`}
          >
            Registration {event.registrationStatus}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{formattedDateRange}</span>
        </div>

        {event.venueName && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="line-clamp-1">{event.venueName}</span>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>
              {event.registeredCount} registered
              {event.capacity && ` / ${event.capacity}`}
            </span>
          </div>
          {event.checkedInCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {event.checkedInCount} checked in
            </span>
          )}
        </div>

        {event.capacity && event.registeredCount >= event.capacity && (
          <Badge variant="outline" className="w-full justify-center">
            Event Full
          </Badge>
        )}
      </CardContent>
    </Card>
  );
}