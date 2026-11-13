import { Mic, Target, FileText, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Mic,
    title: "Voice conversation",
    text: "Speak your answers and hear the interviewer reply in real time.",
  },
  {
    icon: Target,
    title: "Tailored to the role",
    text: "Questions come from the job and company you are applying to.",
  },
  {
    icon: FileText,
    title: "Feedback on every answer",
    text: "See what worked, what was weak, and how to say it better.",
  },
  {
    icon: RefreshCw,
    title: "Practice anytime",
    text: "Run a session in minutes and repeat it as often as you like.",
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="max-w-xl text-3xl font-bold tracking-tight md:text-4xl">
        Built to feel like the real thing
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title}>
              <CardHeader>
                <Icon className="mb-2 h-7 w-7 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{feature.text}</CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
