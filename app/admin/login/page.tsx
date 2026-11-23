"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

function LoginCard() {
  const params = useSearchParams();
  const router = useRouter();
  const denied = params?.get("error") === "AccessDenied" || params?.get("error") === "CredentialsSignin";
  const googleConfigured = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID);

  const [email, setEmail] = useState("touchlinebrandingsignage@gmail.com");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setAuthError(null);

    const res = await signIn("admin-password", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setAuthError("Invalid admin credentials. Please check your email and password.");
      setSubmitting(false);
    } else {
      router.push("/admin/catalog");
    }
  }

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
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest ml-auto">
            TOUCHLINE // ADMIN TERMINAL
          </span>
        </div>

        {/* Main card */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-8 sm:p-10 space-y-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-2 block">
              // SECURE ACCESS
            </p>
            <h1 className="font-display text-4xl sm:text-5xl uppercase leading-none font-bold">
              ADMIN<br />PORTAL
            </h1>
          </div>

          {(denied || authError) && (
            <div className="p-3 border-l-2 border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs">
              {authError || "Access denied. Check credentials or authorized email list."}
            </div>
          )}

          {/* Email + Password Direct Form */}
          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[var(--bg)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-[var(--text)] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs rounded-xl bg-[var(--bg)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-[var(--text)] font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 rounded-xl text-xs font-semibold justify-center shadow-md disabled:opacity-50"
            >
              {submitting ? "Verifying Credentials..." : "Sign In to Admin Dashboard →"}
            </button>
          </form>

          {/* Google SSO Divider */}
          <div className="relative flex items-center justify-center my-4">
            <span className="w-full border-t border-[var(--border)]"></span>
            <span className="px-3 bg-[var(--surface)] text-[10px] font-mono uppercase text-[var(--text-muted)] whitespace-nowrap">
              or Google SSO
            </span>
            <span className="w-full border-t border-[var(--border)]"></span>
          </div>

          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/admin/catalog" })}
            disabled={!googleConfigured}
            className="w-full py-3 px-4 rounded-xl border border-[var(--border)] hover:bg-[var(--bg-soft)] text-xs font-semibold text-[var(--text)] transition-colors flex items-center justify-center gap-2"
          >
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border border-[var(--border)] border-t-0 bg-[var(--bg)]">
          <span className="font-mono text-xs text-[var(--text-muted)]">touchlineltd.co.ke</span>
          <span className="font-mono text-xs text-[var(--text-muted)]">INTERNAL ONLY</span>
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
