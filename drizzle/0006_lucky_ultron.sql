ALTER TABLE "interviews" ADD COLUMN "started_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "interviews" ADD COLUMN "ended_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "interview_messages" DROP COLUMN "started_at";--> statement-breakpoint
ALTER TABLE "interview_messages" DROP COLUMN "ended_at";