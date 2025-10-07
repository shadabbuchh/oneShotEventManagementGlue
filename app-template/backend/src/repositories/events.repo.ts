import { eq, and, gte, lte, like, sql, desc, asc } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { events, attendees, type Event, type NewEvent } from '../db/schema';
import type * as schema from '../db/schema';
import type { EventFilters, EventSortOptions, EventWithCounts } from '../types/events.types';

export const eventsRepo = (db: NodePgDatabase<typeof schema>) => ({
  async findAll(
    filters: EventFilters,
    sortOptions: EventSortOptions,
    offset: number,
    limit: number
  ): Promise<EventWithCounts[]> {
    const conditions = [];

    if (filters.search) {
      conditions.push(like(events.name, `%${filters.search}%`));
    }

    if (filters.status) {
      conditions.push(eq(events.status, filters.status));
    }

    if (filters.startDate) {
      conditions.push(gte(events.startDate, filters.startDate));
    }

    if (filters.endDate) {
      conditions.push(lte(events.endDate, filters.endDate));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Determine sort column
    let orderByColumn;
    switch (sortOptions.sortBy) {
      case 'name':
        orderByColumn = events.name;
        break;
      case 'status':
        orderByColumn = events.status;
        break;
      case 'date':
      default:
        orderByColumn = events.startDate;
        break;
    }

    const orderByDirection = sortOptions.sortOrder === 'asc' ? asc : desc;

    const result = await db
      .select({
        id: events.id,
        name: events.name,
        slug: events.slug,
        startDate: events.startDate,
        endDate: events.endDate,
        venueName: events.venueName,
        address: events.address,
        description: events.description,
        capacity: events.capacity,
        status: events.status,
        visibility: events.visibility,
        registrationStatus: events.registrationStatus,
        createdAt: events.createdAt,
        updatedAt: events.updatedAt,
        registeredCount: sql<number>`
          COALESCE(
            (SELECT COUNT(*)
             FROM ${attendees}
             WHERE ${attendees.eventId} = ${events.id}
             AND ${attendees.status} IN ('registered', 'checked_in')
            ), 0
          )`.as('registeredCount'),
        checkedInCount: sql<number>`
          COALESCE(
            (SELECT COUNT(*)
             FROM ${attendees}
             WHERE ${attendees.eventId} = ${events.id}
             AND ${attendees.status} = 'checked_in'
            ), 0
          )`.as('checkedInCount'),
      })
      .from(events)
      .where(whereClause)
      .orderBy(orderByDirection(orderByColumn))
      .limit(limit)
      .offset(offset);

    return result as EventWithCounts[];
  },

  async count(filters: EventFilters): Promise<number> {
    const conditions = [];

    if (filters.search) {
      conditions.push(like(events.name, `%${filters.search}%`));
    }

    if (filters.status) {
      conditions.push(eq(events.status, filters.status));
    }

    if (filters.startDate) {
      conditions.push(gte(events.startDate, filters.startDate));
    }

    if (filters.endDate) {
      conditions.push(lte(events.endDate, filters.endDate));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select({ count: sql<number>`count(*)` })
      .from(events)
      .where(whereClause);

    return result[0]?.count ?? 0;
  },

  async findById(id: string): Promise<Event | null> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0] || null;
  },

  async findBySlug(slug: string): Promise<Event | null> {
    const result = await db.select().from(events).where(eq(events.slug, slug)).limit(1);
    return result[0] || null;
  },

  async create(data: NewEvent): Promise<Event> {
    const result = await db.insert(events).values(data).returning();
    return result[0];
  },

  async update(id: string, data: Partial<NewEvent>): Promise<Event | null> {
    const result = await db
      .update(events)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(events.id, id))
      .returning();
    return result[0] || null;
  },

  async delete(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }
});