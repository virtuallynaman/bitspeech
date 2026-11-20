import InterviewHeader from "@/components/interview/interview-header";
import SetupForm from "@/components/interview/setup-form";
import { requireSession } from "@/lib/require-session";

export const metadata = { title: "Set up your interview – BitSpeech" };

export default async function NewInterviewPage() {
  await requireSession();

  return (
    <div className="flex min-h-screen flex-col">
      <InterviewHeader />

      <main className="flex flex-1 items-center justify-center px-6 pb-12">
        <SetupForm />
      </main>
    </div>
  );
}
