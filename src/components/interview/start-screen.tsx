import { Headphones, LoaderCircle, MessageCircle, Volume1, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import InterviewHeader from "./interview-header";
import { SummaryCard, type InterviewSummaryData } from "./interview-summary";

type Props = {
  connecting: boolean;
  summary: InterviewSummaryData;
  onStart: () => void;
};

const tips = [
  { icon: Volume1, text: "Find a quiet environment" },
  { icon: Headphones, text: "Use a mic or headphones" },
  { icon: Wifi, text: "Ensure a stable internet connection" },
  { icon: MessageCircle, text: "Be ready to speak naturally" },
];

export default function StartScreen({ connecting, summary, onStart }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader locked={connecting} />

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-5 px-6 pb-12 text-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ready when you are</h1>
          <p className="mt-2 text-muted-foreground">
            Answer out loud, just like a real interview.
          </p>
        </div>

        <SummaryCard summary={summary} />

        <ul className="grid w-full max-w-md gap-x-6 gap-y-3 text-left text-sm text-muted-foreground sm:grid-cols-2">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <li key={tip.text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                {tip.text}
              </li>
            );
          })}
        </ul>

        <div className="space-y-3">
          <Button
            size="lg"
            className="h-11 px-8 text-base"
            disabled={connecting}
            onClick={onStart}
          >
            {connecting ? (
              <>
                <LoaderCircle className="animate-spin" />
                Connecting...
              </>
            ) : (
              "Start interview"
            )}
          </Button>

          <p className="text-sm text-muted-foreground">
            Your browser will ask for microphone access.
          </p>
        </div>
      </main>
    </div>
  );
}