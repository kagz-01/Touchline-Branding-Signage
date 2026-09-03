import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      {session?.user && (
        <aside className="hidden lg:flex w-60 flex-col border-r border-[var(--border)] bg-[var(--surface)] fixed h-full z-30">
          <div className="p-6 border-b border-[var(--border)]">
            <Link href="/admin" className="font-display text-lg text-[var(--text)]">
              TOUCHLINE <span className="text-[var(--accent)]">Admin</span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
            >
              <span className="w-4 h-4 border border-current rounded-sm flex items-center justify-center text-[8px]">□</span>
              Dashboard
            </Link>
            <Link
              href="/admin/leads"
              className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)] transition-colors"
            >
              <span className="w-4 h-4 border border-current rounded-sm flex items-center justify-center text-[8px]">◇</span>
              Leads
            </Link>
          </nav>

          <div className="p-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0">
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                  {session.user.email?.charAt(0).toUpperCase() || '?'}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--text)] truncate">{session.user.name || 'Admin'}</p>
                <p className="text-xs text-[var(--text-muted)] truncate">{session.user.email}</p>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Main content */}
      <main className={`flex-1 ${session?.user ? 'lg:ml-60' : ''} pb-16 lg:pb-0`}>
        {/* Mobile header */}
        {session?.user && (
          <div className="lg:hidden sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 flex items-center justify-between">
            <Link href="/admin" className="font-display text-lg text-[var(--text)]">
              TOUCHLINE <span className="text-[var(--accent)]">Admin</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/admin" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Dashboard</Link>
              <Link href="/admin/leads" className="text-sm text-[var(--text-muted)] hover:text-[var(--text)]">Leads</Link>
            </nav>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
