import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  text,
  pgEnum,
  index,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { events } from './events.schema';

export const attendeeStatusEnum = pgEnum('attendee_status', ['registered', 'checked_in', 'canceled']);

export const attendees = pgTable('attendees', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  ticketType: varchar('ticket_type', { length: 100 }),
  status: attendeeStatusEnum('status').notNull().default('registered'),
  notes: text('notes'),
  referenceNumber: varchar('reference_number', { length: 50 }).notNull().unique(),
  checkedInAt: timestamp('checked_in_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  eventIdIdx: index('attendee_event_id_idx').on(table.eventId),
  statusIdx: index('attendee_status_idx').on(table.status),
  emailIdx: index('attendee_email_idx').on(table.email),
  eventEmailIdx: uniqueIndex('attendee_event_email_idx').on(table.eventId, table.email),
}));

export type Attendee = typeof attendees.$inferSelect;
export type NewAttendee = typeof attendees.$inferInsert;