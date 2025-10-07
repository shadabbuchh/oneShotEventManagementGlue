import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  integer,
  pgEnum,
  index
} from 'drizzle-orm/pg-core';

export const eventStatusEnum = pgEnum('event_status', ['draft', 'published', 'closed', 'archived']);
export const eventVisibilityEnum = pgEnum('event_visibility', ['public', 'private']);
export const registrationStatusEnum = pgEnum('registration_status', ['open', 'closed']);

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  venueName: varchar('venue_name', { length: 255 }),
  address: text('address'),
  description: text('description'),
  capacity: integer('capacity'),
  status: eventStatusEnum('status').notNull().default('draft'),
  visibility: eventVisibilityEnum('visibility').notNull().default('public'),
  registrationStatus: registrationStatusEnum('registration_status').notNull().default('closed'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  statusIdx: index('event_status_idx').on(table.status),
  startDateIdx: index('event_start_date_idx').on(table.startDate),
  slugIdx: index('event_slug_idx').on(table.slug),
}));

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;