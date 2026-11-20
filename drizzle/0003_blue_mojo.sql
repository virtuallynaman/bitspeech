CREATE TABLE "interview_messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interview_id" uuid NOT NULL,
	"item_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"sequence" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "interview_messages_interview_id_unique" UNIQUE("interview_id")
);
--> statement-breakpoint
ALTER TABLE "interview_messages" ADD CONSTRAINT "interview_messages_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "interview_messages_interview_item_idx" ON "interview_messages" USING btree ("interview_id","item_id");--> statement-breakpoint
CREATE INDEX "interview_messages_interview_sequence_idx" ON "interview_messages" USING btree ("interview_id","sequence");