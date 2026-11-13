import Link from "next/link";
import { Button } from "@/components/ui/button";

const links = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Progress", href: "#progress" },
  { label: "Who it’s for", href: "#audience" },
];

export default function Header() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="h-7 w-7 rounded-lg bg-primary" />
        BitSpeech
      </Link>

      <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
        {links.map((link) => (
          <a key={link.href} href={link.href} className="hover:text-foreground">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
          Log in
        </Button>
        <Button nativeButton={false} render={<Link href="/signup" />}>
          Start free
        </Button>
      </div>
    </header>
  );
}
