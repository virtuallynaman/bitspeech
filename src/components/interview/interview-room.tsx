import EndingScreen from "./ending-screen";
import LiveScreen from "./live-screen";
import StartScreen from "./start-screen";
import type { InterviewSummaryData } from "./interview-summary";
import type { TranscriptMessage } from "./transcript";

type Props = {
  status: "idle" | "connecting" | "connected" | "ending";
  summary: InterviewSummaryData;
  messages: TranscriptMessage[];
  audioLevel: number; // 0 to 1
  onStart: () => void;
  onEnd: () => void;
};

export default function InterviewRoom({
  status,
  summary,
  messages,
  audioLevel,
  onStart,
  onEnd,
}: Props) {
  if (status === "connected") {
    return (
      <LiveScreen
        summary={summary}
        messages={messages}
        audioLevel={audioLevel}
        onEnd={onEnd}
      />
    );
  }

  if (status === "ending") {
    return <EndingScreen />;
  }

  return (
    <StartScreen
      connecting={status === "connecting"}
      summary={summary}
      onStart={onStart}
    />
  );
}
