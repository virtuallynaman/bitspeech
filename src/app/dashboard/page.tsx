import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/stat-card";
import RecentInterviews, { type Interview } from "@/components/dashboard/recent-interviews";
import { requireSession } from "@/lib/require-session";

export default async function DashboardPage() {
  const session = await requireSession();
  const firstName = session.user.name.split(" ")[0];

  // TODO: replace this sample data with a query for this user's interviews
  const interviews: Interview[] = [
    { id: "1", role: "Full-Stack Developer", date: "Sep 28", score: 78 },
    { id: "2", role: "JavaScript", date: "Sep 27", score: 82 },
    { id: "3", role: "React", date: "Sep 24", score: 60 },
  ];

  const total = interviews.length;
  const best = total > 0 ? Math.max(...interviews.map((i) => i.score)) : 0;
  const average =
    total > 0
      ? Math.round(interviews.reduce((sum, i) => sum + i.score, 0) / total)
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

      <RecentInterviews interviews={interviews} />
    </div>
  );
}
