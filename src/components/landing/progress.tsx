import { Check } from "lucide-react";
import ScreenshotFrame from "./screenshot-frame";

const points = [
  "View detailed interview history",
  "Track topic-wise performance",
  "Identify strengths and weak areas",
  "Practice as many times as you want",
];

export default function Progress() {
  return (
    <section
      id="progress"
      className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2"
    >
      <div className="order-2 md:order-1">
        {/* Add: src="/screenshots/dashboard.png" later */}
        <ScreenshotFrame alt="The progress dashboard" />
      </div>

      <div className="order-1 md:order-2">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          See your growth over time
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          All your past interviews, scores, and feedback are saved, so you can
          track your progress and focus on what needs work.
        </p>

        <ul className="mt-8 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3">
              <Check className="h-5 w-5 shrink-0 text-primary" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
