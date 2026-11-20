"use client";

import { useEffect, useState } from "react";
import AudioVisualizer from "./audio-visualizer";
import InterviewHeader from "./interview-header";

export default function EndingScreen() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(() => {
      setLevel((current) => (current === 0 ? 0.7 : 0));
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader locked />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 px-6 pb-12 text-center">
        <AudioVisualizer level={level} className="h-40 w-40" />

        <div role="status">
          <h1 className="text-3xl font-bold tracking-tight">Wrapping up your interview</h1>
          <p className="mt-2 text-muted-foreground">
            We’re preparing your feedback. This may take a moment.
          </p>
        </div>
      </main>
    </div>
  );
}
