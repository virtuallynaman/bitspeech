'use client';

import { useRef, useState } from "react";
import { RealtimeAgent, RealtimeSession } from "@openai/agents/realtime";
import InterviewRoom from "./interview-room";
import { InterviewSummaryData } from "./interview-summary";
import { TranscriptMessage } from "./transcript";
import { useRouter } from "next/navigation";

type VoiceInterviewProps = {
  interviewId: string;
  summary: InterviewSummaryData;
}

export function VoiceInterview({ interviewId, summary }: VoiceInterviewProps) {
  const sessionRef = useRef<RealtimeSession | null>(null);
  const [messages, setMessages] = useState<TranscriptMessage[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const router = useRouter();

  type ConnectionStatus = "idle" | "connecting" | "connected";

  const [status, setStatus] = useState<ConnectionStatus>("idle");

  async function startInterview() {
    if (status !== "idle") return;

    setStatus("connecting");

    try {
      const response = await fetch("/api/realtime/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Could not get realtime token");
      }

      const { clientSecret, instructions } = await response.json();

      const agent = new RealtimeAgent({
        name: "BitSpeech Interviewer",
        instructions,
      });

      const session = new RealtimeSession(agent, {
        model: "gpt-realtime-2.1-mini",
      });

      sessionRef.current = session;

      await session.connect({ apiKey: clientSecret });

      setStatus("connected");

    } catch (error) {
      console.error("Connection Error:", error);

      if (sessionRef.current) {
        await endInterview();
      } else {
        setStatus("idle");
      }
    }
  }

  async function endInterview() {
    const session = sessionRef.current;

    if (!session) return;

    const history = session.history;

    const transcriptMessages: {
      itemId: string;
      role: "user" | "assistant";
      content: string;
      sequence: number;
    }[] = [];

    for (const [sequence, item] of history.entries()) {
      if (item.type !== "message") continue;
      if (item.role !== "user" && item.role !== "assistant") continue;
      if (item.status !== "completed") continue;

      let content = "";

      for (const part of item.content) {
        if ("transcript" in part && typeof part.transcript === "string") {
          content += part.transcript;
        } else if ("text" in part && typeof part.text === "string") {
          content += part.text;
        }
      }

      content = content.trim();

      if (!content) continue;

      transcriptMessages.push({
        itemId: item.itemId,
        role: item.role,
        content,
        sequence,
      });
    }

    session.close();
    sessionRef.current = null;

    let navigatedToResults = false;

    try {
      if (transcriptMessages.length === 0) {
        throw new Error("No transcript messages found.");
      }

      const transcriptResponse = await fetch(
        `/api/interviews/${interviewId}/transcript`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: transcriptMessages }),
        },
      );

      const transcriptData = await transcriptResponse.json();

      if (!transcriptResponse.ok) {
        throw new Error(
          transcriptData.error ?? "Failed to save transcript",
        );
      }

      console.log("Transcript saved successfully");

      router.replace(`/interview/${interviewId}/results`);
      navigatedToResults = true;

      const evaluationResponse = await fetch(
        `/api/interviews/${interviewId}/evaluate`,
        { method: "POST" },
      );

      const evaluationData = await evaluationResponse.json();

      if (!evaluationResponse.ok) {
        throw new Error(
          evaluationData.error ?? "Evaluation failed",
        );
      }

      console.log("Evaluation saved:", evaluationData.evaluation);

      router.refresh();
    } catch (error) {
      console.error("Interview finalization failed:", error);

      if (!navigatedToResults) {
        setStatus("idle");
      }
    }
  }

  return (
    <InterviewRoom
      status={status}
      summary={summary}
      messages={messages}
      audioLevel={audioLevel}
      onStart={startInterview}
      onEnd={endInterview}
    />
  );
}