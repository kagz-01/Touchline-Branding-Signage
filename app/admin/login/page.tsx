"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginCard() {
  const params = useSearchParams();
  const denied = params.get("error") === "AccessDenied";
  const googleConfigured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center border border-[var(--border)] bg-[var(--surface)] rounded-[var(--radius-md)] p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] mb-2">Internal</p>
        <h1 className="font-display text-2xl mb-1">Touchline Admin</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">Sign in to review enquiries</p>

        {denied && (
          <div className="mb-5 text-left text-sm bg-[var(--bg-soft)] border border-[var(--accent2)] text-[var(--text)] rounded-[var(--radius-sm)] px-3 py-2">
            That Google account isn't on the admin list. Ask whoever manages this site to add your email.
          </div>
        )}

        {!googleConfigured && (
          <div className="mb-5 text-left text-sm bg-[var(--bg-soft)] border border-[var(--accent2)] text-[var(--text)] rounded-[var(--radius-sm)] px-3 py-2">
            Google OAuth is not configured yet. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your environment to enable admin sign-in.
          </div>
        )}

        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/leads" })}
          disabled={!googleConfigured}
          className="w-full rounded-[var(--radius-sm)] bg-[var(--accent)] text-[var(--accent-ink)] px-6 py-3 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue with Google
        </button>
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
