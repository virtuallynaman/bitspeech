import { Card, CardContent } from "@/components/ui/card";
import { getScoreBand } from "./score-utils";

type Props = {
  score: number;
  summary: string;
};

// The ring is a circle drawn with a dashed stroke.
// The dash length is the filled part, so a longer dash = a higher score.
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function ScoreOverview({ score, summary }: Props) {
  const band = getScoreBand(score);

  // how much of the ring stays empty
  const empty = CIRCUMFERENCE * (1 - Math.min(100, Math.max(0, score)) / 100);

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
        <div className="relative h-40 w-40 shrink-0">
          {/* -rotate-90 makes the ring start at the top instead of the right */}
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
            {/* grey track */}
            <circle cx="60" cy="60" r={RADIUS} fill="none" strokeWidth="8" className="stroke-muted" />
            {/* colored part */}
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={empty}
              className={band.stroke}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold tabular-nums">{score}</span>
            <span className="text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <p className="text-sm text-muted-foreground">Overall score</p>
          <p className={`text-2xl font-semibold ${band.text}`}>{band.label}</p>
          <p className="mt-3 leading-relaxed text-muted-foreground">{summary}</p>
        </div>
      </CardContent>
    </Card>
  );
}
