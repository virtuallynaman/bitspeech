import { db } from "@/db";
import { interviews } from "@/db/interview-schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import OpenAI from "openai";
const apiKey = process.env.OPENAI_API_KEY;

const client = apiKey
  ? new OpenAI({
    apiKey,
  })
  : null;

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const requestSchema = z.object({
    interviewId: z.uuid(),
  });

  const result = requestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const interviewId = result.data.interviewId;

  const [interview] = await db
    .select()
    .from(interviews)
    .where(
      and(
        eq(interviews.id, interviewId),
        eq(interviews.userId, session.user.id)
      )
    );

  if (!interview) {
    return NextResponse.json({ error: "Interview not found." }, { status: 404 });
  }

  if (!client) {
    return NextResponse.json(
      { error: "API Key is missing" },
      { status: 500 }
    );
  }

  const interviewFocus: Record<string, string> = {
    technical:
      "Assess technical knowledge, practical problem-solving, and understanding of relevant programming concepts and technologies.",

    behavioral:
      "Assess communication, collaboration, ownership, adaptability, decision-making, and problem-solving through behavioral questions.",

    mixed:
      "Assess both technical knowledge and behavioral competencies. Alternate between technical and behavioral questions throughout the interview.",
  };

  const focus =
    interviewFocus[interview.interviewType] ??
    "Conduct a general software engineering mock interview.";

  const roleContext = interview.role
    ? `Target role: ${interview.role}.`
    : "";

  const technologyContext =
    interview.technologies.length > 0
      ? `Relevant technologies: ${interview.technologies.join(", ")}.`
      : "";

  const instructions = `
    You are BitSpeech, an experienced and professional technical interviewer conducting a mock job interview.

    INTERVIEW DETAILS
    - Interview type: ${interview.interviewType}
    - Candidate level: ${interview.level}
    - ${focus}
    ${roleContext}
    ${technologyContext}

    YOUR RESPONSIBILITIES
    1. Begin with a brief, natural introduction and explain that you will ask one question at a time.
    2. Ask questions appropriate to the selected interview type, role, technologies, and candidate level.
    3. Wait for the candidate to finish answering before asking another question.
    4. Ask relevant follow-up questions based on the candidate's answers. Explore their reasoning rather than mechanically moving through a list.
    5. Adapt the difficulty and depth of subsequent questions to the candidate's responses.
    6. For behavioral interviews, encourage answers grounded in actual experiences. Accept academic projects, personal projects, internships, and other relevant experiences; do not assume the candidate has professional work experience.
    7. For technical interviews, assess understanding and practical problem-solving. Ask questions appropriate for a spoken interview.

    INTERVIEW RULES
    - Ask only ONE question at a time.
    - Do not answer your own questions.
    - Do not provide hints, solutions, tutorials, or corrections during the interview.
    - Do not turn the interview into a casual conversation or provide excessive encouragement.
    - Do not repeat questions unnecessarily.
    - Do not invent information about the candidate.
    - Do not reveal evaluation criteria or give feedback in the middle of the interview.
    - If the candidate asks you to repeat or clarify a question, do so patiently.
    - If the candidate wants to end the interview, acknowledge this and conclude naturally.

    VOICE AND COMMUNICATION
    - Speak naturally, as a real professional interviewer would.
    - Keep responses concise and easy to follow when spoken aloud.
    - Maintain a professional, neutral, and respectful tone.
    - Avoid long monologues, unnecessary explanations, and multiple questions in one response.
    - Do not use markdown formatting or unnecessarily structured lists in spoken responses.

    Start the interview with a short greeting and your first question.
  `;

  try {
    const clientSecret = await client.realtime.clientSecrets.create({
      expires_after: {
        anchor: "created_at",
        seconds: 600,
      },
      session: {
        type: "realtime",
        model: "gpt-realtime-2.1-mini",
        instructions,
      }
    });

    const [startedInterview] = await db
      .update(interviews)
      .set({
        status: "in_progress",
        startedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(interviews.id, interviewId),
          eq(interviews.userId, session.user.id),
          eq(interviews.status, "pending"),
        ),
      )
      .returning({ id: interviews.id });

    if (!startedInterview) {
      return NextResponse.json(
        { error: "Interview cannot be started." },
        { status: 409 },
      );
    }

    return NextResponse.json({
      clientSecret: clientSecret.value,
      instructions,
    });

  } catch (error) {
    console.error("Client secret creation error:", error);

    return NextResponse.json(
      { error: "Failed to create client secret" },
      { status: 500 },
    );
  }
}