import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-5xl">
          Walk into your next interview ready.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-lg">
          Your first mock interview is free.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8"
          nativeButton={false}
          render={<Link href="/signup" />}
        >
          Start free
        </Button>
      </div>
    </section>
  );
}
