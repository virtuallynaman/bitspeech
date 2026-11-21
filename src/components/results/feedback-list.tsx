import { ArrowUpRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  title: string;
  items: string[];
  variant: "strengths" | "improvements";
};

// the icon and color for each kind of list
const styles = {
  strengths: { icon: Check, color: "text-green-400" },
  improvements: { icon: ArrowUpRight, color: "text-amber-400" },
};

export default function FeedbackList({ title, items, variant }: Props) {
  const { icon: Icon, color } = styles[variant];

  if (items.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex gap-3">
              <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${color}`} aria-hidden="true" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
