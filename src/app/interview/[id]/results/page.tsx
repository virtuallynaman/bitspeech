import Link from "next/link";
import { and, asc, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { z } from "zod";
import { db } from "@/db";
import {
  interview_evaluations,
  interview_messages,
  interviews,
} from "@/db/interview-schema";
import { Button } from "@/components/ui/button";
import InterviewHeader from "@/components/interview/interview-header";
import { SummaryBadges } from "@/components/interview/interview-summary";
import CriteriaBreakdown from "@/components/results/criteria-breakdown";
import FeedbackList from "@/components/results/feedback-list";
import PreparingResults from "@/components/results/preparing-results";
import ScoreOverview from "@/components/results/score-overview";
import TranscriptSection from "@/components/results/transcript-section";
import { requireSession } from "@/lib/require-session";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ResultsPage({ params }: Props) {
  const session = await requireSession();
  const { id } = await params;

  const validId = z.uuid().safeParse(id);

  if (!validId.success) notFound();

  const [interview] = await db
    .select({
      id: interviews.id,
      interviewType: interviews.interviewType,
      level: interviews.level,
      role: interviews.role,
      technologies: interviews.technologies,
    })
    .from(interviews)
    .where(
      and(
        eq(interviews.id, validId.data),
        eq(interviews.userId, session.user.id),
      ),
    );

  if (!interview) notFound();

  const [evaluation] = await db
    .select()
    .from(interview_evaluations)
    .where(eq(interview_evaluations.interviewId, interview.id));

  if (!evaluation) return <PreparingResults />;

  const messages = await db
    .select({
      id: interview_messages.id,
      role: interview_messages.role,
      content: interview_messages.content,
    })
    .from(interview_messages)
    .where(eq(interview_messages.interviewId, interview.id))
    .orderBy(asc(interview_messages.sequence));

  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader />

      <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-6 pb-16 pt-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your interview results</h1>
          <div className="mt-3">
            <SummaryBadges summary={interview} />
          </div>
        </div>

        <ScoreOverview score={evaluation.overallScore} summary={evaluation.summary} />

        <FeedbackList title="Strengths" items={evaluation.strengths} variant="strengths" />
        <FeedbackList
          title="Areas to improve"
          items={evaluation.areasToImprove}
          variant="improvements"
        />

        <CriteriaBreakdown criteria={evaluation.criteria} />

        <TranscriptSection messages={messages} />

        <div className="flex flex-wrap gap-3">
          <Button size="lg" nativeButton={false} render={<Link href="/interview/new" />}>
            Practice again
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/dashboard" />}
          >
            Back to dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}