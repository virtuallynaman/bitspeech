import { Card, CardContent } from "@/components/ui/card";
import type { interview_evaluations } from "@/db/interview-schema";
import { getScoreBand } from "./score-utils";

type Criterion = (typeof interview_evaluations.$inferSelect)["criteria"][number];

type Props = {
  criteria: Criterion[];
};

export default function CriteriaBreakdown({ criteria }: Props) {
  if (criteria.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Score breakdown</h2>

      <div className="space-y-4">
        {criteria.map((criterion) => {
          const band = getScoreBand(criterion.score);

          return (
            <Card key={criterion.name}>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-medium">{criterion.name}</h3>
                  <span className={`font-semibold tabular-nums ${band.text}`}>
                    {criterion.score}/100
                  </span>
                </div>

                <div className="mt-3 h-1.5 rounded-full bg-muted" aria-hidden="true">
                  <div
                    className={`h-1.5 rounded-full ${band.bar}`}
                    style={{ width: `${criterion.score}%` }}
                  />
                </div>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {criterion.feedback}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
