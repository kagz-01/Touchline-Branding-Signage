import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Touchline',
  description: 'How Touchline collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-4">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-muted)] mb-12">Effective date: September 2026</p>

        <div className="prose-theme space-y-10 text-[var(--text)] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-4">1. Who we are</h2>
            <p>
              Touchline (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates touchlineltd.co.ke and its subdomains
              (branding.touchlineltd.co.ke, signage.touchlineltd.co.ke). We are a branding and signage company
              registered in Nairobi, Kenya.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">2. Information we collect</h2>
            <p className="mb-4">We collect information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name, email address, phone number</li>
              <li>Company name and business details</li>
              <li>Project specifications (logos, designs, quantities)</li>
              <li>Delivery addresses</li>
              <li>Payment information (processed securely via third-party providers)</li>
            </ul>
            <p className="mt-4">We also collect automatically:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Browser type and IP address</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">3. How we use your information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To respond to your enquiries and provide quotes</li>
              <li>To process orders and deliver products/services</li>
              <li>To send project updates and order confirmations</li>
              <li>To improve our website and services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">4. Information sharing</h2>
            <p>
              We do not sell or rent your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Delivery partners (for shipping your orders)</li>
              <li>Payment processors (for handling transactions)</li>
              <li>Analytics providers (anonymised usage data)</li>
              <li>Law enforcement (when legally required)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">5. Data security</h2>
            <p>
              We implement industry-standard security measures including encrypted data transmission (HTTPS),
              secure server infrastructure, and access controls. However, no method of transmission over the
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">6. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and brand preferences. We do not use
              advertising or tracking cookies. See our{' '}
              <a href="/cookies" className="text-[var(--accent)] underline">Cookie Policy</a>{' '}
              for details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">7. Your rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, email us at info@touchlineltd.co.ke.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">8. Data retention</h2>
            <p>
              We retain your information for as long as necessary to provide our services and comply with
              legal obligations. Enquiry data is retained for 12 months. Order data is retained for 7 years
              as required by Kenyan tax law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">9. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Changes will be posted on this page with an
              updated effective date.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">10. Contact us</h2>
            <p>
              For privacy-related enquiries, contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Email: info@touchlineltd.co.ke</li>
              <li>Phone: +254 722 668 696</li>
              <li>Location: Nairobi, Kenya</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
