import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy — Touchline',
  description: 'Refund and return policy for Touchline products and services.',
};

export default function RefundsPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl md:text-5xl text-[var(--text)] mb-4">Refund Policy</h1>
        <p className="text-sm text-[var(--text-muted)] mb-12">Effective date: September 2026</p>

        <div className="prose-theme space-y-10 text-[var(--text)] leading-relaxed">
          <section>
            <h2 className="font-display text-2xl mb-4">Overview</h2>
            <p>
              Because our products are custom-made to your specifications, we generally cannot offer
              refunds on completed orders. However, we stand behind our work and will make things right
              if we made a mistake.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Full refund</h2>
            <p className="mb-4">You are eligible for a full refund if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You cancel before production has begun (deposit refunded in full)</li>
              <li>We fail to deliver within the agreed timeline and you choose to cancel</li>
              <li>The product is materially different from the approved design</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Partial refund</h2>
            <p className="mb-4">You may receive a partial refund if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You cancel after production has begun (deposit minus material costs already incurred)</li>
              <li>Delivered goods have minor defects that do not affect functionality</li>
              <li>Partial order completion due to circumstances beyond our control</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">No refund</h2>
            <p className="mb-4">Refunds are not available for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products that match the approved design and meet quality standards</li>
              <li>Change of mind after production is complete</li>
              <li>Incorrect information provided by the client (wrong sizes, spelling, logos)</li>
              <li>Normal wear and tear after delivery</li>
              <li>Products damaged by the client or third-party couriers after handoff</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Defective products</h2>
            <p className="mb-4">If you receive a defective product:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contact us within 48 hours of delivery with photos of the defect</li>
              <li>We will assess the issue and offer repair, replacement, or partial refund</li>
              <li>Claims reported after 48 hours may not be eligible</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Installation issues</h2>
            <p>
              For signage installation, we offer a 30-day workmanship warranty. If installed signage
              develops issues within 30 days due to our workmanship, we will repair or reinstall at
              no cost.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">How to request a refund</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Email hello@touchlineltd.co.ke with your order number and reason</li>
              <li>Include photos if the issue is product-related</li>
              <li>We will respond within 3 business days</li>
              <li>Approved refunds are processed within 14 business days via your original payment method</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl mb-4">Contact</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email: hello@touchlineltd.co.ke</li>
              <li>Phone: +254 722 668 696</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
