'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import type { Session } from 'next-auth';

const NAV = [
  {
    id: 'overview',
    label: 'Overview',
    href: '/client-dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: 'requests',
    label: 'Requests',
    href: '/client-dashboard/requests',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" />
      </svg>
    ),
  },
  {
    id: 'documents',
    label: 'Documents',
    href: '/client-dashboard/documents',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/client-dashboard/projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
      </svg>
    ),
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/client-dashboard/messages',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    id: 'support',
    label: 'Support',
    href: '/client-dashboard/support',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
];

function NavLink({ item, collapsed }: { item: typeof NAV[0]; collapsed?: boolean }) {
  const pathname = usePathname();
  // exact match for overview, startsWith for others
  const isActive = item.href === '/client-dashboard'
    ? pathname === '/client-dashboard'
    : Boolean(pathname?.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
        isActive
          ? 'bg-[var(--accent)] text-[var(--accent-ink)] shadow-sm'
          : 'text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface)]'
      } ${collapsed ? 'justify-center' : ''}`}
      aria-current={isActive ? 'page' : undefined}
      title={collapsed ? item.label : undefined}
    >
      <span className={`flex-shrink-0 ${isActive ? 'text-[var(--accent-ink)]' : 'text-[var(--text-muted)] group-hover:text-[var(--accent)]'} transition-colors`}>
        {item.icon}
      </span>
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

export default function ClientDashboardShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const user = session.user;

  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* ── Sidebar (desktop) ─────────────────── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-[var(--border)] bg-[var(--bg-soft)] sticky top-0 h-screen overflow-y-auto">
        {/* Logo area */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[var(--border)]">
          <Link href="/" className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest hover:opacity-80 transition-opacity">
            ← Touchline
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Client dashboard">
          {NAV.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>

        {/* User card */}
        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            {user?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.image} alt={user.name ?? ''} className="w-9 h-9 rounded-full border-2 border-[var(--accent)]" />
            ) : (
              <span className="w-9 h-9 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-sm font-bold flex items-center justify-center">
                {(user?.name ?? 'U')[0].toUpperCase()}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text)] truncate">{user?.name}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-2 w-full text-xs text-[var(--text-muted)] hover:text-[var(--text)] py-1.5 rounded-lg hover:bg-[var(--surface)] transition-colors text-left px-2"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main content ──────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[var(--bg-soft)] border-b border-[var(--border)]">
          <Link href="/" className="text-xs font-mono text-[var(--accent)] uppercase tracking-widest">← Touchline</Link>
          <span className="text-sm font-semibold text-[var(--text)]">Dashboard</span>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="text-xs text-[var(--text-muted)]">Out</button>
        </header>

        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--border)] pb-safe"
          style={{ background: 'color-mix(in srgb, var(--bg-soft) 92%, transparent)', backdropFilter: 'blur(20px)' }}>
          <div className="grid grid-cols-5">
            {NAV.slice(0, 5).map((item) => {
              return <MobileNavItem key={item.id} item={item} />;
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

function MobileNavItem({ item }: { item: typeof NAV[0] }) {
  const pathname = usePathname();
  const isActive = item.href === '/client-dashboard'
    ? pathname === '/client-dashboard'
    : Boolean(pathname?.startsWith(item.href));

  return (
    <Link
      href={item.href}
      className={`relative flex flex-col items-center gap-1 py-3 text-[10px] font-medium uppercase tracking-wide transition-all active:scale-95 ${
        isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
      }`}
    >
      {isActive && (
        <span className="absolute top-1.5 inset-x-2 h-8 rounded-full"
          style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)' }} />
      )}
      <span className="relative z-10">{item.icon}</span>
      <span className="relative z-10">{item.label}</span>
    </Link>
  );
}

