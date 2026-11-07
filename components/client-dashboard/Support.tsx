import Link from 'next/link';

const FAQS = [
  {
    q: 'How long does a quotation take?',
    a: 'We typically respond to quotation requests within 24 business hours. For urgent requests, please mark your request as "Urgent" and we will prioritise it.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your request is approved, it becomes a project. You can track its progress under the Projects tab.',
  },
  {
    q: 'Can I request changes after submitting?',
    a: "Yes — open the relevant request and send us a message in the conversation thread. We'll review and confirm any changes.",
  },
  {
    q: 'How do I get an invoice?',
    a: 'Request an invoice via the Requests tab. Select "Request Invoice" and provide the relevant details.',
  },
  {
    q: 'Where are my delivery notes?',
    a: 'Delivery notes are available under the Documents tab once your order has been dispatched.',
  },
];

export default function SupportView() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text)]">Support</h1>
        <p className="text-sm text-[var(--text-muted)] mt-0.5">Get help and find answers to common questions</p>
      </div>

      {/* Quick contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="tel:+254722668696"
          className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
          <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl group-hover:bg-[var(--accent)] transition-colors">📞</span>
          <div>
            <p className="font-semibold text-sm text-[var(--text)]">Call Us</p>
            <p className="text-xs text-[var(--text-muted)]">+254 722 668 696</p>
          </div>
        </a>
        <a href="https://wa.me/254722668696" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
          <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl group-hover:bg-[var(--accent)] transition-colors">💬</span>
          <div>
            <p className="font-semibold text-sm text-[var(--text)]">WhatsApp</p>
            <p className="text-xs text-[var(--text-muted)]">Quick responses on WhatsApp</p>
          </div>
        </a>
        <a href="mailto:info@touchlineltd.co.ke"
          className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
          <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl group-hover:bg-[var(--accent)] transition-colors">✉️</span>
          <div>
            <p className="font-semibold text-sm text-[var(--text)]">Email</p>
            <p className="text-xs text-[var(--text-muted)]">info@touchlineltd.co.ke</p>
          </div>
        </a>
        <Link href="/client-dashboard/requests/new?type=general"
          className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-all group">
          <span className="w-11 h-11 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl group-hover:bg-[var(--accent)] transition-colors">📋</span>
          <div>
            <p className="font-semibold text-sm text-[var(--text)]">Submit Request</p>
            <p className="text-xs text-[var(--text-muted)]">Create a support request</p>
          </div>
        </Link>
      </div>

      {/* FAQs */}
      <div>
        <h2 className="text-sm font-mono uppercase tracking-widest text-[var(--text-muted)] mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <details key={i} className="group rounded-2xl bg-[var(--surface)] border border-[var(--border)] overflow-hidden">
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none font-medium text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                {faq.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 shrink-0 text-[var(--text-muted)] group-open:rotate-180 transition-transform">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <div className="px-5 pb-4 text-sm text-[var(--text-muted)] border-t border-[var(--border)] pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* Business hours */}
      <div className="p-5 rounded-2xl bg-[var(--bg-soft)] border border-[var(--border)]">
        <h3 className="font-semibold text-sm text-[var(--text)] mb-3">Business Hours</h3>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-[var(--text)]">
            <span>Monday – Friday</span><span className="font-medium">8:00 AM – 6:00 PM EAT</span>
          </div>
          <div className="flex justify-between text-[var(--text)]">
            <span>Saturday</span><span className="font-medium">9:00 AM – 2:00 PM EAT</span>
          </div>
          <div className="flex justify-between text-[var(--text-muted)]">
            <span>Sunday</span><span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
