import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Touchline',
  description: 'Terms governing the use of Touchline services and website.',
};

export default function TermsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-4">Terms of Service</h1>
        <p className="text-sm text-[var(--text-muted)] mb-12">Effective date: September 2026</p>

        <div className="prose-theme space-y-10 text-[var(--text)] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-4">1. Agreement</h2>
            <p>
              By using our website or engaging our services, you agree to these Terms of Service.
              If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">2. Services</h2>
            <p className="mb-4">Touchline provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Branding:</strong> Custom merchandise, corporate apparel, promotional products, and branded items</li>
              <li><strong>Signage:</strong> Signage fabrication, installation, LED signage, vehicle wraps, and environmental graphics</li>
            </ul>
            <p className="mt-4">
              All services are subject to availability and mutual agreement on specifications, pricing, and timelines.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">3. Quotes and pricing</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Quotes are valid for 14 days from the date of issue unless stated otherwise</li>
              <li>Prices are in Kenya Shillings (KES) and exclude VAT unless stated otherwise</li>
              <li>We reserve the right to revise quotes based on material cost changes or scope changes</li>
              <li>Final pricing is confirmed upon written order acceptance</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">4. Orders and payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>A 50% deposit is required to begin production</li>
              <li>Remaining balance is due upon delivery or within 7 days of invoice date</li>
              <li>Payments can be made via M-Pesa, bank transfer, or cheque</li>
              <li>Orders may be paused or cancelled if payment is not received on time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">5. Production timelines</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Estimated timelines are provided at the point of order and vary by product</li>
              <li>Standard branding: 5–10 business days after deposit and design approval</li>
              <li>Signage fabrication: 7–21 business days depending on complexity</li>
              <li>We are not liable for delays caused by client-side approval bottlenecks</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">6. Design approval</h2>
            <p>
              You are responsible for reviewing and approving all designs before production begins.
              Once approved, changes may incur additional costs. Touchline is not liable for errors
              in client-approved designs (spelling, logos, dimensions, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">7. Delivery</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delivery timelines begin after production is complete</li>
              <li>We use third-party couriers; risk transfers to you upon handoff</li>
              <li>Installation services are quoted separately and scheduled independently</li>
              <li>You must inspect goods within 48 hours of delivery and report any issues</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">8. Refunds and returns</h2>
            <p>
              Due to the custom nature of our products, refunds are limited. See our{' '}
              <a href="/refunds" className="text-[var(--accent)] underline">Refund Policy</a>{' '}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">9. Intellectual property</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>You warrant that you own or have rights to all logos, designs, and content you provide</li>
              <li>Touchline retains ownership of our design templates and processes</li>
              <li>We may photograph completed projects for our portfolio unless you opt out in writing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">10. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Touchline shall not be liable for indirect,
              incidental, or consequential damages. Our total liability shall not exceed the amount
              paid for the specific order giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">11. Governing law</h2>
            <p>
              These terms are governed by the laws of the Republic of Kenya. Any disputes shall be
              resolved in the courts of Nairobi.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">12. Changes</h2>
            <p>
              We reserve the right to update these terms at any time. Continued use of our services
              constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">13. Contact</h2>
            <p>
              For questions about these terms, contact us at:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Email: info@touchlineltd.co.ke</li>
              <li>Phone: +254 722 668 696</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
