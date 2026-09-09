"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginCard() {
  const params = useSearchParams();
  const denied = params.get("error") === "AccessDenied";
  const googleConfigured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[var(--bg)]">
      <div className="w-full max-w-md">
        {/* Terminal header bar */}
        <div className="flex items-center gap-3 mb-0 px-6 py-3 border border-[var(--border)] border-b-0 bg-[var(--surface)]">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full border border-[var(--border)]"></span>
            <span className="w-2.5 h-2.5 rounded-full border border-[var(--border)]"></span>
            <span className="w-2.5 h-2.5 rounded-full border border-[var(--accent)]"></span>
          </div>
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest ml-auto">SECURE TERMINAL // v1.0</span>
        </div>

        {/* Main card */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-6 block">
            // INTERNAL ACCESS
          </p>
          <h1 className="font-display text-5xl md:text-6xl uppercase mb-2 leading-none">SYSTEM<br/>LOGIN</h1>
          <p className="font-mono text-sm text-[var(--text-muted)] mb-10 mt-4">
            Authorised staff only. Access is controlled by approved-email list.
          </p>

          {denied && (
            <div className="mb-8 text-left border-l-2 border-[var(--accent2)] pl-4 py-2">
              <span className="font-mono text-xs text-[var(--accent2)] uppercase tracking-widest block mb-1">// ACCESS DENIED</span>
              <p className="font-mono text-sm text-[var(--text-muted)]">
                That Google account is not on the authorised list. Contact the platform administrator to add your email.
              </p>
            </div>
          )}

          {!googleConfigured && (
            <div className="mb-8 text-left border-l-2 border-[var(--accent2)] pl-4 py-2">
              <span className="font-mono text-xs text-[var(--accent2)] uppercase tracking-widest block mb-1">// ENV CONFIG ERROR</span>
              <p className="font-mono text-sm text-[var(--text-muted)]">
                GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are not set. Authentication is unavailable.
              </p>
            </div>
          )}

          <button
            onClick={() => signIn("google", { callbackUrl: "/admin/leads" })}
            disabled={!googleConfigured}
            className="w-full group relative overflow-hidden border border-[var(--border)] bg-transparent px-8 py-5 text-left disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-[var(--accent)] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out z-0 group-disabled:hidden"></div>
            <span className="relative z-10 font-mono text-sm uppercase tracking-widest group-hover:text-[var(--bg)] transition-colors duration-300 font-bold flex items-center gap-4">
              <span className="text-[var(--accent)] group-hover:text-[var(--bg)] transition-colors">→</span>
              AUTHENTICATE WITH GOOGLE
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border border-[var(--border)] border-t-0 bg-[var(--bg)]">
          <span className="font-mono text-xs text-[var(--text-muted)]">touchlineltd.co.ke</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">ADMIN PORTAL</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginCard />
    </Suspense>
  );
}
