import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  locked?: boolean; 
  wide?: boolean;
};

export default function InterviewHeader({ locked = false, wide = false }: Props) {
  const logo = (
    <>
      <span className="h-6 w-6 rounded-md bg-primary" />
      BitSpeech
    </>
  );

  return (
    <header
      className={`mx-auto flex w-full items-center justify-between px-6 py-5 ${
        wide ? "max-w-5xl" : "max-w-3xl"
      }`}
    >
      {locked ? (
        <div className="flex items-center gap-2 text-lg font-bold">{logo}</div>
      ) : (
        <>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold">
            {logo}
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>
        </>
      )}
    </header>
  );
}
