import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    title: "Pick your role",
    text: "Paste a job description or choose a role, level, and interview type.",
  },
  {
    title: "Interview out loud",
    text: "Answer by voice or text while the AI adapts its questions to what you say.",
  },
  {
    title: "Review and improve",
    text: "Get a transcript, feedback on each answer, and a plan for your next round.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        Three steps to a better interview
      </h2>
      <p className="mt-3 max-w-xl text-lg text-muted-foreground">
        From job description to useful feedback in a single session.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <Card key={step.title}>
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                {index + 1}
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{step.text}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
