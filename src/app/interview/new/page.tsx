import SetupForm from "@/components/interview/setup-form";
import { requireSession } from "@/lib/require-session";

export const metadata = { title: "Set up your interview – BitSpeech" };

export default async function NewInterviewPage() {
  await requireSession();

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-12">
      <SetupForm />
    </main>
  );
}
