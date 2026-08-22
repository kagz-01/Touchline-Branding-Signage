"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export function AdminNav({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const isLeads = pathname?.startsWith("/admin/leads");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            {/* Active pulse indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--text)]">
              TOUCHLINE ADMIN
            </span>
          </div>

          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/admin/leads"
              className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors duration-200 ${
                isLeads
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent)]/5"
                  : "border-transparent text-[var(--text-muted)] hover:border-[var(--border)] hover:text-[var(--text)]"
              }`}
            >
              // ENQUIRIES
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block font-mono text-xs text-[var(--text-muted)] border border-[var(--border)] px-3 py-1">
            {userEmail}
          </span>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            SIGN OUT →
          </button>
        </div>
      </div>
    </header>
  );
}
