import { Event, Session, Attendee } from '../db/schema';

export interface EventWithCounts extends Event {
  registeredCount: number;
  checkedInCount: number;
}

export interface EventFilters {
  search?: string;
  status?: 'draft' | 'published' | 'closed' | 'archived';
  startDate?: Date;
  endDate?: Date;
}

export interface EventSortOptions {
  sortBy: 'date' | 'name' | 'status';
  sortOrder: 'asc' | 'desc';
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface EventWithDetails extends Event {
  sessions?: Session[];
  attendees?: Attendee[];
}

export interface CreateEventData {
  name: string;
  startDate: Date;
  endDate: Date;
  venueName?: string | null;
  address?: string | null;
  description?: string | null;
  capacity?: number | null;
  visibility?: 'public' | 'private';
  registrationStatus?: 'open' | 'closed';
  status?: 'draft' | 'published';
}