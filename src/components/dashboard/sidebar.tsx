"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Mic, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interviews", href: "/interviews", icon: Mic },
  { label: "Profile", href: "/dashboard/profile", icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    const { error } = await authClient.signOut();

    if (error) {
      setLoading(false);
      return;
    }

    router.replace("/login");
  }

  return (
    <aside className="flex w-full flex-col gap-4 border-b border-border p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <Link href="/" className="flex items-center gap-2 text-lg font-bold">
        <span className="h-6 w-6 rounded-md bg-primary" />
        BitSpeech
      </Link>

      <nav className="flex gap-1 md:flex-col">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
                }`}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Button
        variant="ghost"
        className="justify-start md:mt-auto"
        disabled={loading}
        onClick={handleLogout}
      >
        <LogOut />
        {loading ? "Signing out..." : "Sign out"}
      </Button>
    </aside>
  );
}
