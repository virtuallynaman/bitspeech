import { Clock, PhoneOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import AudioVisualizer from "./audio-visualizer";
import ElapsedTime from "./elapsed-time";
import InterviewHeader from "./interview-header";
import { SummaryBadges, type InterviewSummaryData } from "./interview-summary";
import Transcript, { type TranscriptMessage } from "./transcript";

type Props = {
  summary: InterviewSummaryData;
  messages: TranscriptMessage[];
  audioLevel: number;
  onEnd: () => void;
};

export default function LiveScreen({ summary, messages, audioLevel, onEnd }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader locked wide />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 pb-[12vh]">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <SummaryBadges summary={summary} />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <ElapsedTime />
          </div>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-between gap-8">
            <div className="flex flex-1 items-center">
              <AudioVisualizer level={audioLevel} className="h-64 w-64 sm:h-72 sm:w-72" />
            </div>

            <Button size="lg" variant="destructive" className="h-11 px-6" onClick={onEnd}>
              <PhoneOff />
              End interview
            </Button>
          </div>

          <Transcript messages={messages} />
        </div>
      </main>
    </div>
  );
}
