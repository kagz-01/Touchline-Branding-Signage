"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span className="font-display text-sm">Touchline Admin</span>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/admin/leads"
              className={pathname?.startsWith("/admin/leads") ? "text-[var(--accent)]" : "text-[var(--text-muted)]"}
            >
              Enquiries
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
          <span className="hidden sm:inline">{userEmail}</span>
          <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="underline hover:text-[var(--text)]">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
