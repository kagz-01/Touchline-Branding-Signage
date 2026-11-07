export default function ProjectsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Track the progress of your active projects</p>
      </div>
      <div className="text-center py-16 rounded-2xl border border-dashed border-[var(--border)]">
        <p className="text-4xl mb-3">🏗️</p>
        <p className="text-sm font-medium text-[var(--text)]">No active projects</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Projects will appear here once a request is approved by the Touchline team</p>
      </div>
    </div>
  );
}
