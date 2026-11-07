'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';

export function HeaderAuthButton({ mobile = false }: { mobile?: boolean }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className={`${mobile ? 'w-7 h-7' : 'w-20 h-8'} rounded-lg bg-[var(--surface)] animate-pulse opacity-40`} />
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        {!mobile && (
          <Link
            href="/client-dashboard"
            className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Dashboard
          </Link>
        )}
        {/* Avatar + dropdown trigger */}
        <Link
          href="/client-dashboard"
          className="flex items-center gap-2 group"
          aria-label="Open client dashboard"
        >
          {session.user?.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={session.user.image}
              alt={session.user.name ?? 'User'}
              className="w-7 h-7 rounded-full border-2 border-[var(--accent)] group-hover:scale-105 transition-transform"
            />
          ) : (
            <span className="w-7 h-7 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-bold flex items-center justify-center">
              {(session.user?.name ?? 'U')[0].toUpperCase()}
            </span>
          )}
        </Link>
        {!mobile && (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
          >
            Sign out
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/client-dashboard' })}
      className={`${mobile ? 'text-xs py-1.5 px-3' : 'text-xs py-2 px-4'} btn-primary font-semibold`}
    >
      {mobile ? 'Sign in' : 'Client Login'}
    </button>
  );
}

