import { db } from "@/db";
import { interview_messages, interviews } from "@/db/interview-schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const validId = z.uuid().safeParse(id);

  if (!validId.success) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messageSchema = z.object({
    itemId: z.string().nonempty(),
    role: z.enum(["user", "assistant"]),
    content: z.string().nonempty(),
    sequence: z.number().int().nonnegative(),
  })

  const requestSchema = z.object({
    messages: z.array(messageSchema).min(1)
  });

  const result = requestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const [interview] = await db
    .select()
    .from(interviews)
    .where(
      and(
        eq(interviews.id, validId.data),
        eq(interviews.userId, session.user.id)
      )
    );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found." }, { status: 404 });
  }

  if (interview.status !== "in_progress") {
    return NextResponse.json(
      { error: "Interview is not in progress." },
      { status: 409 },
    );
  }

  await db
    .insert(interview_messages)
    .values(
      result.data.messages.map((message) => ({
        interviewId: validId.data,
        itemId: message.itemId,
        role: message.role,
        content: message.content,
        sequence: message.sequence,
      }))
    )
    .onConflictDoNothing({ target: [interview_messages.interviewId, interview_messages.itemId] });

  const [completedInterview] = await db
    .update(interviews)
    .set({
      status: "completed",
      endedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(interviews.id, validId.data),
        eq(interviews.userId, session.user.id),
        eq(interviews.status, "in_progress"),
      )
    )
    .returning({ id: interviews.id });

  if (!completedInterview) {
    return NextResponse.json(
      { error: "Interview cannot be completed." },
      { status: 409 },
    );
  }

  return NextResponse.json({ success: true });
}