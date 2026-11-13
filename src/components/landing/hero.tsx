import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ScreenshotFrame from "./screenshot-frame";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 text-center">
      <Badge variant="outline" className="mb-6 p-3 text-sm">
        AI mock interviews, on demand
      </Badge>

      <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        Practice the interview before it counts.
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
        Talk to an AI interviewer that asks real follow-ups, listens to your
        answers, and gives you feedback you can act on right away.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
          Start a mock interview
        </Button>
        <Button size="lg" variant="outline" nativeButton={false} render={<a href="#how" />}>
          See how it works
        </Button>
      </div>

      <div className="mx-auto mt-16 max-w-4xl text-left">
        {/* Add: src="/screenshots/interview.png" */}
        <ScreenshotFrame alt="The mock interview screen" />
      </div>
    </section>
  );
}
