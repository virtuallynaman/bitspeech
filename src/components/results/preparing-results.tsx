"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import EndingScreen from "@/components/interview/ending-screen";
import InterviewHeader from "@/components/interview/interview-header";

const CHECK_EVERY_MS = 3000; 
const MAX_CHECKS = 20;

export default function PreparingResults() {
  const router = useRouter();
  const [checks, setChecks] = useState(0);
  const gaveUp = checks >= MAX_CHECKS;

  useEffect(() => {
    if (gaveUp) return;

    const timer = setTimeout(() => {
      router.refresh();
      setChecks((current) => current + 1);
    }, CHECK_EVERY_MS);

    return () => clearTimeout(timer);
  }, [checks, gaveUp, router]);

  if (!gaveUp) {
    return <EndingScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-12 text-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            This is taking longer than expected
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your feedback isn’t ready yet. You can check again, or come back later
            from your dashboard.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={() => setChecks(0)}>
            Check again
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<Link href="/dashboard" />}
          >
            Back to dashboard
          </Button>
        </div>
      </main>
    </div>
  );
}
