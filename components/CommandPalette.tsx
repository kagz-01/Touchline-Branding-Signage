'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getCrossBrandUrl } from '@/lib/brand';

type CommandItem = {
  id: string;
  label: string;
  description?: string;
  href: string;
  category: string;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandItem[] = useMemo(() => {
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    return [
      { id: 'home', label: 'Go to Home', href: '/', category: 'Navigation' },
      { id: 'services', label: 'Go to Services', href: '/services', category: 'Navigation' },
      { id: 'portfolio', label: 'Go to Portfolio', href: '/portfolio', category: 'Navigation' },
      { id: 'book', label: 'Request a Quote', href: '/book', category: 'Actions' },
      { id: 'branding', label: 'Touchline Branding', href: getCrossBrandUrl('branding', host), category: 'Brands' },
      { id: 'signage', label: 'Touchline Signage', href: getCrossBrandUrl('signage', host), category: 'Brands' },
      { id: 'admin', label: 'Admin Dashboard', href: '/admin', category: 'Admin' },
      { id: 'admin-leads', label: 'View Leads', href: '/admin/leads', category: 'Admin' },
    ];
  }, []);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    setOpen(false);
    // If it's an absolute cross-subdomain URL, navigate directly
    if (href.startsWith('http')) {
      window.location.href = href;
    } else {
      router.push(href);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex].href);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />

      {/* Palette */}
      <div className="relative w-full max-w-lg mx-4 bg-[var(--surface)] border border-[var(--border)] rounded-[var(--radius-md)] shadow-lg animate-scale-in overflow-hidden">
        <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
          <svg className="w-4 h-4 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search or jump to..."
            className="flex-1 py-3 bg-transparent text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border)] rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-[var(--text-muted)]">No results found.</div>
          ) : (
            filtered.map((cmd, i) => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd.href)}
                className={`w-full text-left px-3 py-2.5 rounded-[var(--radius-sm)] flex items-center justify-between transition-colors ${
                  i === selectedIndex ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : 'text-[var(--text)] hover:bg-[var(--bg-soft)]'
                }`}
              >
                <div>
                  <p className="text-sm font-medium">{cmd.label}</p>
                  {cmd.description && (
                    <p className="text-xs text-[var(--text-muted)]">{cmd.description}</p>
                  )}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] px-1.5 py-0.5 border border-[var(--border)] rounded">
                  {cmd.category}
                </span>
              </button>
            ))
          )}
        </div>

        <div className="px-4 py-2 border-t border-[var(--border)] flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><kbd className="px-1 border border-[var(--border)] rounded">↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1 border border-[var(--border)] rounded">↵</kbd> Select</span>
          <span className="flex items-center gap-1"><kbd className="px-1 border border-[var(--border)] rounded">⌘K</kbd> Toggle</span>
        </div>
      </div>
    </div>
  );
}
