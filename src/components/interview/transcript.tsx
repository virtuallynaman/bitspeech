"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type TranscriptMessage = {
  id: string;
  role: "assistant" | "user";
  text: string;
};

type Props = {
  messages: TranscriptMessage[];
};

export default function Transcript({ messages }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  // scroll to the newest message whenever the messages change
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="h-[min(34rem,calc(100vh-14rem))] min-h-88">
      <CardHeader>
        <CardTitle>Transcript</CardTitle>
      </CardHeader>

      <CardContent className="min-h-0 flex-1">
        <div ref={listRef} className="h-full space-y-5 overflow-y-auto pr-2">
          {messages.length === 0 && (
            <p className="text-muted-foreground">
              The conversation will appear here as you talk.
            </p>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === "user" ? "border-l-2 border-primary pl-3" : ""}
            >
              <p className="mb-1 text-sm text-muted-foreground">
                {message.role === "assistant" ? "Interviewer" : "You"}
              </p>
              <p className="leading-relaxed">{message.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
