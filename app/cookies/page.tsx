import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy — Touchline',
  description: 'How Touchline uses cookies on our website.',
};

export default function CookiesPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-4">Cookie Policy</h1>
        <p className="text-sm text-[var(--text-muted)] mb-12">Effective date: September 2026</p>

        <div className="prose-theme space-y-10 text-[var(--text)] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-4">What are cookies</h2>
            <p>
              Cookies are small text files placed on your device when you visit a website. They help
              the site remember your preferences and improve your experience.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Cookies we use</h2>

            <div className="space-y-6 mt-4">
              <div>
                <h3 className="font-display text-lg mb-2">Essential cookies</h3>
                <p>Required for the site to function. Cannot be disabled.</p>
                <ul className="list-disc pl-6 space-y-2 mt-2">
                  <li><strong>tb-brand:</strong> Remembers your brand preference (branding or signage) as you navigate between pages. Expires after 30 days.</li>
                  <li><strong>next-auth.session-token:</strong> Admin authentication session. Only set when logging into the admin dashboard. Expires after 30 days.</li>
                  <li><strong>touchline-theme:</strong> Stores your dark/light mode preference. Set in localStorage, not a cookie.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg mb-2">Analytics cookies</h3>
                <p>
                  We do not currently use analytics cookies. If we add analytics in the future,
                  this policy will be updated and you will be notified.
                </p>
              </div>

              <div>
                <h3 className="font-display text-lg mb-2">Advertising cookies</h3>
                <p>We do not use advertising or tracking cookies.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Third-party services</h2>
            <p className="mb-4">Our site may load resources from:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google Fonts</strong> — for web fonts (may set cookies on Google&apos;s domain)</li>
              <li><strong>WhatsApp</strong> — when you click the WhatsApp button, you leave our site and WhatsApp&apos;s cookies apply</li>
            </ul>
            <p className="mt-4">
              We do not control third-party cookies. Please refer to their respective policies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Managing cookies</h2>
            <p className="mb-4">You can control cookies through your browser settings:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Block all cookies (may break site functionality)</li>
              <li>Delete cookies when you close your browser</li>
              <li>Receive a notification when cookies are set</li>
            </ul>
            <p className="mt-4">
              Disabling essential cookies will prevent the site from remembering your brand preference
              and may affect admin access.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Changes</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Contact</h2>
            <p>For questions about our cookie practices:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Email: hello@touchlineltd.co.ke</li>
              <li>Phone: +254 722 668 696</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
