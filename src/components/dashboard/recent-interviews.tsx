import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Interview = {
  id: string;
  interviewType: string;
  level: string;
  role: string | null;
  status: string;
  createdAt: Date;
  overallScore: number | null;
};

type Props = {
  interviews: Interview[];
};

function formatLabel(value: string) {
  if (value === "fullstack") return "Full-stack";

  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function RecentInterviews({ interviews }: Props) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent interviews</CardTitle>
      </CardHeader>

      <CardContent>
        {interviews.length === 0 && (
          <p className="text-muted-foreground">
            No interviews yet. Start your first one above!
          </p>
        )}

        <ul className="divide-y divide-border">
          {interviews.map((interview) => {
            const href =
              interview.status === "completed"
                ? `/interview/${interview.id}/results`
                : `/interview/${interview.id}`;

            const title = interview.role
              ? `${formatLabel(interview.role)} interview`
              : `${formatLabel(interview.interviewType)} interview`;

            const date = new Intl.DateTimeFormat("en-IN", {
              dateStyle: "medium",
            }).format(interview.createdAt);

            return (
              <li key={interview.id}>
                <Link
                  href={href}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatLabel(interview.interviewType)} ·{" "}
                      {formatLabel(interview.level)} · {date}
                    </p>
                  </div>

                  {interview.overallScore !== null ? (
                    <Badge
                      variant="outline"
                      className={
                        interview.overallScore >= 70
                          ? "border-green-500/40 text-green-400"
                          : "border-red-500/40 text-red-400"
                      }
                    >
                      {interview.overallScore}/100
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      {interview.status === "in_progress"
                        ? "In progress"
                        : interview.status === "pending"
                          ? "Not started"
                          : "Results pending"}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}