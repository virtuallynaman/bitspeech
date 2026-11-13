import { GraduationCap, Code, Briefcase } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const groups = [
  {
    icon: GraduationCap,
    title: "Students",
    text: "Prepare for internships and entry-level positions.",
  },
  {
    icon: Code,
    title: "Developers",
    text: "Sharpen your skills and get ready for technical interviews.",
  },
  {
    icon: Briefcase,
    title: "Career switchers",
    text: "Build confidence and practice for a new role.",
  },
];

export default function Audience() {
  return (
    <section id="audience" className="mx-auto max-w-6xl px-6 py-20">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Who is this for?</h2>
        <p className="mx-auto mt-3 max-w-xl text-lg text-muted-foreground">
          Whether you’re just starting out or preparing for your next big
          opportunity, BitSpeech helps you practice and improve.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {groups.map((group) => {
          const Icon = group.icon;
          return (
            <Card key={group.title}>
              <CardContent className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{group.title}</h3>
                  <p className="mt-1 text-muted-foreground">{group.text}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
