import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type Interview = {
  id: string;
  role: string;
  date: string;
  score: number;
};

type Props = {
  interviews: Interview[];
};

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
          {interviews.map((interview) => (
            <li
              key={interview.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="font-medium">{interview.role}</p>
                <p className="text-sm text-muted-foreground">{interview.date}</p>
              </div>

              <Badge
                variant="outline"
                className={
                  interview.score >= 70
                    ? "border-green-500/40 text-green-400"
                    : "border-red-500/40 text-red-400"
                }
              >
                {interview.score}/100
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
