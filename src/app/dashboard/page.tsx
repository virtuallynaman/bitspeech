import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/stat-card";
import RecentInterviews from "@/components/dashboard/recent-interviews";
import { desc, eq } from "drizzle-orm";
import { interviews, interview_evaluations } from "@/db/interview-schema";
import { requireSession } from "@/lib/require-session";
import { db } from "@/db";

export default async function DashboardPage() {
  const session = await requireSession();
  const firstName = session.user.name.split(" ")[0];

  const userInterviews = await db
    .select({
      id: interviews.id,
      interviewType: interviews.interviewType,
      level: interviews.level,
      role: interviews.role,
      technologies: interviews.technologies,
      status: interviews.status,
      createdAt: interviews.createdAt,
      overallScore: interview_evaluations.overallScore,
    })
    .from(interviews)
    .leftJoin(
      interview_evaluations,
      eq(interview_evaluations.interviewId, interviews.id),
    )
    .where(eq(interviews.userId, session.user.id))
    .orderBy(desc(interviews.createdAt));

  const total = userInterviews.length;

  const scores = userInterviews
    .map((interview) => interview.overallScore)
    .filter((score): score is number => score !== null);

  const best = scores.length > 0 ? Math.max(...scores) : 0;

  const average =
    scores.length > 0
      ? Math.round(
        scores.reduce((sum, score) => sum + score, 0) / scores.length,
      )
      : 0;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-1 text-muted-foreground">Ready to practice today?</p>
        </div>

        <Button size="lg" nativeButton={false} render={<Link href="/interview/new" />}>
          <Plus />
          Start new interview
        </Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Total interviews" value={total} />
        <StatCard label="Average score" value={average} />
        <StatCard label="Best score" value={best} />
      </div>

      <RecentInterviews interviews={userInterviews} />
    </div>
  );
}
