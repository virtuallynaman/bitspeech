import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Redirect to the dashboard if logged in
  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/3 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <Link href="/" className="mb-8 flex items-center gap-2 text-xl font-bold">
        <span className="h-7 w-7 rounded-lg bg-primary" />
        BitSpeech
      </Link>

      {children}
    </div>
  );
}
