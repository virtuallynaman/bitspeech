import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type {
  InterviewType,
  Level,
  Role,
  Technology,
} from "@/lib/constants/interview";
import { levelOptions, roleOptions, typeOptions } from "./options";

export type InterviewSummaryData = {
  interviewType: InterviewType;
  level: Level;
  role?: Role | null;
  technologies?: Technology[] | null;
};

function labelFor<T extends string>(
  options: readonly { value: T; label: string }[],
  value: T
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}

// Bigger version, shown before the interview starts
export function SummaryCard({ summary }: { summary: InterviewSummaryData }) {
  const technologies = summary.technologies ?? [];

  return (
    <Card className="w-full max-w-lg text-left">
      <CardContent>
        <dl className="space-y-3 text-sm">
          <Row label="Interview type" value={labelFor(typeOptions, summary.interviewType)} />
          <Row label="Experience level" value={labelFor(levelOptions, summary.level)} />
          {summary.role && <Row label="Role" value={labelFor(roleOptions, summary.role)} />}

          {technologies.length > 0 && (
            <div className="flex items-start justify-between gap-4">
              <dt className="shrink-0 pt-0.5 text-muted-foreground">Technologies</dt>
              <dd className="flex flex-wrap justify-end gap-1.5">
                {technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
}

// Small version, shown during the interview
export function SummaryBadges({ summary }: { summary: InterviewSummaryData }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline">{labelFor(typeOptions, summary.interviewType)}</Badge>
      <Badge variant="outline">{labelFor(levelOptions, summary.level)}</Badge>
      {summary.role && <Badge variant="outline">{labelFor(roleOptions, summary.role)}</Badge>}
    </div>
  );
}