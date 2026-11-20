import { requireSession } from "@/lib/require-session";

export default async function InterviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return <>{children}</>;
}
