import type { FastifyInstance } from 'fastify';
import { eventsRepo } from '../repositories/events.repo';
import type {
  EventFilters,
  EventSortOptions,
  PaginationOptions,
  PaginationMeta,
  EventWithCounts,
  CreateEventData
} from '../types/events.types';
import type { Event } from '../db/schema';
import { generateSlug } from '../utils/slug';

export const makeEventsService = (app: FastifyInstance) => {
  const repo = eventsRepo(app.db);

  return {
    async getEvents(
      filters: EventFilters,
      sortOptions: EventSortOptions,
      pagination: PaginationOptions
    ): Promise<{ data: EventWithCounts[]; pagination: PaginationMeta }> {
      const offset = (pagination.page - 1) * pagination.limit;

      const [events, totalItems] = await Promise.all([
        repo.findAll(filters, sortOptions, offset, pagination.limit),
        repo.count(filters)
      ]);

      const totalPages = Math.ceil(totalItems / pagination.limit);

      return {
        data: events,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          totalPages,
          totalItems
        }
      };
    },

    async getEventById(id: string): Promise<Event | null> {
      return repo.findById(id);
    },

    async getEventBySlug(slug: string): Promise<Event | null> {
      return repo.findBySlug(slug);
    },

    async createEvent(data: CreateEventData): Promise<Event> {
      // Validate dates
      if (new Date(data.endDate) <= new Date(data.startDate)) {
        throw new Error('End date must be after start date');
      }

      // Generate unique slug
      const baseSlug = generateSlug(data.name);
      let slug = baseSlug;
      let counter = 1;

      while (await repo.findBySlug(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }

      const eventData = {
        ...data,
        slug,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        status: data.status || 'draft' as const,
        visibility: data.visibility || 'public' as const,
        registrationStatus: data.registrationStatus || 'closed' as const
      };

      return repo.create(eventData);
    },

    async updateEvent(id: string, data: Partial<CreateEventData>): Promise<Event | null> {
      const existingEvent = await repo.findById(id);
      if (!existingEvent) {
        return null;
      }

      // Validate dates if provided
      if (data.startDate && data.endDate) {
        if (new Date(data.endDate) <= new Date(data.startDate)) {
          throw new Error('End date must be after start date');
        }
      } else if (data.startDate && !data.endDate) {
        if (new Date(existingEvent.endDate) <= new Date(data.startDate)) {
          throw new Error('End date must be after start date');
        }
      } else if (!data.startDate && data.endDate) {
        if (new Date(data.endDate) <= new Date(existingEvent.startDate)) {
          throw new Error('End date must be after start date');
        }
      }

      const updateData: any = { ...data };
      if (data.startDate) updateData.startDate = new Date(data.startDate);
      if (data.endDate) updateData.endDate = new Date(data.endDate);

      return repo.update(id, updateData);
    },

    async deleteEvent(id: string): Promise<boolean> {
      return repo.delete(id);
    },

    async publishEvent(id: string): Promise<Event | null> {
      return repo.update(id, { status: 'published' });
    },

    async archiveEvent(id: string): Promise<Event | null> {
      return repo.update(id, { status: 'archived' });
    },

    async openRegistration(id: string): Promise<Event | null> {
      return repo.update(id, { registrationStatus: 'open' });
    },

    async closeRegistration(id: string): Promise<Event | null> {
      return repo.update(id, { registrationStatus: 'closed' });
    }
  };
};

export type EventsService = ReturnType<typeof makeEventsService>;