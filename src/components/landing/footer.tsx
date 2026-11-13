import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-8 text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} BitSpeech. All rights reserved.</p>
      <div className="flex gap-6">
        <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
        <Link href="/terms" className="hover:text-foreground">Terms</Link>
        <a href="https://github.com/virtuallynaman/bitspeech" className="hover:text-foreground">GitHub</a>
      </div>
    </footer>
  );
}
