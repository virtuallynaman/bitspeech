import { ChevronDown } from "lucide-react";

type Message = {
  id: string;
  role: string; // "user" or "assistant"
  content: string;
};

type Props = {
  messages: Message[];
};

// The whole conversation, hidden until the user opens it.
// <details> and <summary> are plain HTML, so no JavaScript is needed.
export default function TranscriptSection({ messages }: Props) {
  // only show real conversation lines, skip anything empty or from the system
  const lines = messages.filter(
    (message) =>
      (message.role === "user" || message.role === "assistant") &&
      message.content.trim() !== ""
  );

  if (lines.length === 0) return null;

  return (
    <details className="group rounded-xl border border-border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-6 py-4 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
        <span>
          Full transcript{" "}
          <span className="font-normal text-muted-foreground">({lines.length} messages)</span>
        </span>

        {/* group-open: turns the arrow upside down while the section is open */}
        <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" />
      </summary>

      <div className="space-y-5 border-t border-border px-6 py-5">
        {lines.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "border-l-2 border-primary pl-3" : ""}
          >
            <p className="mb-1 text-sm text-muted-foreground">
              {message.role === "user" ? "You" : "Interviewer"}
            </p>
            <p className="leading-relaxed">{message.content}</p>
          </div>
        ))}
      </div>
    </details>
  );
}
