import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireSession } from "@/lib/require-session";

export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold">
          <span className="h-6 w-6 rounded-md bg-primary" />
          BitSpeech
        </Link>

        <Link
          href="/dashboard"
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </header>

      {children}
    </div>
  );
}
