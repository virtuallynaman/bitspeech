"use client";

import { useEffect, useState } from "react";

export default function ElapsedTime() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();

    const timer = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(seconds / 3600);
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const text = hours > 0 ? `${hours}:${minutes}:${secs}` : `${minutes}:${secs}`;

  return <span className="font-medium tabular-nums text-foreground">{text}</span>;
}
