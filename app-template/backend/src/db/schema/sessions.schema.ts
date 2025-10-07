import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  index
} from 'drizzle-orm/pg-core';
import { events } from './events.schema';

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventId: uuid('event_id').notNull().references(() => events.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  speaker: varchar('speaker', { length: 255 }),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  room: varchar('room', { length: 100 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (table) => ({
  eventIdIdx: index('session_event_id_idx').on(table.eventId),
  startTimeIdx: index('session_start_time_idx').on(table.startTime),
}));

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;