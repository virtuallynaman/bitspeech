CREATE TABLE "interview_evaluations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"interview_id" uuid NOT NULL,
	"overall_score" integer NOT NULL,
	"summary" text NOT NULL,
	"strengths" text[] DEFAULT '{}'::text[] NOT NULL,
	"areas_to_improve" text[] DEFAULT '{}'::text[] NOT NULL,
	"criteria" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interview_evaluations" ADD CONSTRAINT "interview_evaluations_interview_id_interviews_id_fk" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "interview_evaluations_interview_id_idx" ON "interview_evaluations" USING btree ("interview_id");