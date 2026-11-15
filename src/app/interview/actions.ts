"use server";

import { redirect } from "next/navigation";

import { db } from "@/db";
import { interviews } from "@/db/interview-schema";
import { requireSession } from "@/lib/require-session";
import { interviewSetupSchema } from "@/lib/validations/interview";

export async function createInterview(input: unknown) {
  // Authenticate the user
  const session = await requireSession();

  // Validate input using Zod
  const result = interviewSetupSchema.safeParse(input);

  if (!result.success) {
    return {
      error: result.error.issues[0]?.message ?? "Invalid interview configuration."
    };
  }

  // Insert the interview into the database
  const [createdInterview] = await db
    .insert(interviews)
    .values({ userId: session.user.id, interviewType: result.data.interviewType, level: result.data.level, role: result.data.interviewType === "behavioral" ? null : result.data.role, technologies: result.data.interviewType === "behavioral" ? [] : result.data.technologies })
    .returning({ id: interviews.id });

  // Redirect to the interview page
  redirect(`/interview/${createdInterview.id}`);
}