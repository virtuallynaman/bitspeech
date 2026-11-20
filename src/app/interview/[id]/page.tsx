import { db } from "@/db";
import { z } from "zod";
import { notFound } from "next/navigation";
import { requireSession } from "@/lib/require-session";
import { interviews } from "@/db/interview-schema";
import { and, eq } from "drizzle-orm";
import { VoiceInterview } from "@/components/interview/voice-interview";

export default async function InterviewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await requireSession();
  const { id } = await params;

  const isValidId = z.uuid().safeParse(id);

  if (!isValidId.success) {
    notFound();
  }

  const [interview] = await db
    .select()
    .from(interviews)
    .where(
      and(
        eq(interviews.id, id),
        eq(interviews.userId, session.user.id)
      )
    );

  if (!interview) {
    notFound();
  }

  return (
    <VoiceInterview interviewId={interview.id} summary={{ interviewType: interview.interviewType, level: interview.level, role: interview.role, technologies: interview.technologies, }} />
  )
}