CREATE TYPE "public"."attendee_status" AS ENUM('registered', 'checked_in', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."event_status" AS ENUM('draft', 'published', 'closed', 'archived');--> statement-breakpoint
CREATE TYPE "public"."event_visibility" AS ENUM('public', 'private');--> statement-breakpoint
CREATE TYPE "public"."registration_status" AS ENUM('open', 'closed');--> statement-breakpoint
CREATE TABLE "attendees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"ticket_type" varchar(100),
	"status" "attendee_status" DEFAULT 'registered' NOT NULL,
	"notes" text,
	"reference_number" varchar(50) NOT NULL,
	"checked_in_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attendees_reference_number_unique" UNIQUE("reference_number")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"venue_name" varchar(255),
	"address" text,
	"description" text,
	"capacity" integer,
	"status" "event_status" DEFAULT 'draft' NOT NULL,
	"visibility" "event_visibility" DEFAULT 'public' NOT NULL,
	"registration_status" "registration_status" DEFAULT 'closed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "events_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"event_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"speaker" varchar(255),
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"room" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attendees" ADD CONSTRAINT "attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "attendee_event_id_idx" ON "attendees" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "attendee_status_idx" ON "attendees" USING btree ("status");--> statement-breakpoint
CREATE INDEX "attendee_email_idx" ON "attendees" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "attendee_event_email_idx" ON "attendees" USING btree ("event_id","email");--> statement-breakpoint
CREATE INDEX "event_status_idx" ON "events" USING btree ("status");--> statement-breakpoint
CREATE INDEX "event_start_date_idx" ON "events" USING btree ("start_date");--> statement-breakpoint
CREATE INDEX "event_slug_idx" ON "events" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "session_event_id_idx" ON "sessions" USING btree ("event_id");--> statement-breakpoint
CREATE INDEX "session_start_time_idx" ON "sessions" USING btree ("start_time");