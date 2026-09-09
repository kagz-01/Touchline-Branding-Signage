'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from './Reveal';

const TENDER_CATEGORIES = [
  {
    name: 'Documentation',
    items: [
      { id: 'reg-cert', label: 'Valid Certificate of Registration', required: true },
      { id: 'tax-cert', label: 'Tax Compliance Certificate (TCC)', required: true },
      { id: 'nca', label: 'NCA Registration (for large tenders)', required: false },
      { id: 'county-req', label: 'County Government Approval', required: false },
      { id: 'insurance', label: 'Professional Indemnity Insurance', required: false },
    ],
  },
  {
    name: 'Product Requirements',
    items: [
      { id: 'pp-samples', label: 'Pre-Production (PP) Sealed Samples', required: true },
      { id: 'material-spec', label: 'Material Specification Sheets', required: true },
      { id: 'colour-matching', label: 'Colour Matching (Pantone/CMYK)', required: true },
      { id: 'brand-guidelines', label: 'Brand Guidelines Compliance', required: true },
      { id: 'quality-cert', label: 'Quality Assurance Certification', required: false },
    ],
  },
  {
    name: 'Delivery & Pricing',
    items: [
      { id: 'delivery-timeline', label: 'Clear Delivery Timeline', required: true },
      { id: 'pricing-schedule', label: 'Pricing Schedule (per item)', required: true },
      { id: 'volume-discount', label: 'Volume Discount Structure', required: false },
      { id: 'warranty', label: 'Warranty Terms', required: false },
      { id: 'return-policy', label: 'Return/Replacement Policy', required: false },
    ],
  },
  {
    name: 'Compliance',
    items: [
      { id: 'local-content', label: 'Local Content Compliance (60%+)', required: true },
      { id: 'procurement-act', label: 'Public Procurement & Asset Disposal Act', required: true },
      { id: 'county-bylaws', label: 'County Signage/Branding Bylaws', required: false },
      { id: 'environmental', label: 'Environmental Compliance', required: false },
      { id: 'osha', label: 'OSHA Compliance (safety items)', required: false },
    ],
  },
];

export function TenderComplianceChecker() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalRequired = TENDER_CATEGORIES.flatMap((cat) => cat.items.filter((item) => item.required)).length;
  const checkedRequired = TENDER_CATEGORIES.flatMap((cat) =>
    cat.items.filter((item) => item.required && checkedItems[item.id])
  ).length;
  const totalOptional = TENDER_CATEGORIES.flatMap((cat) => cat.items.filter((item) => !item.required)).length;
  const checkedOptional = TENDER_CATEGORIES.flatMap((cat) =>
    cat.items.filter((item) => !item.required && checkedItems[item.id])
  ).length;

  const complianceScore = Math.round((checkedRequired / totalRequired) * 100);

  return (
    <div className="space-y-8">
      {/* Compliance Score */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="font-display text-xl mb-4 text-[var(--text)]">Tender Compliance Checker</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Check if your tender meets county and government requirements. Ticked items = ready.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <span className="font-display text-4xl text-[var(--accent)] block">{complianceScore}%</span>
            <span className="text-xs text-[var(--text-muted)]">Required Items</span>
          </div>
          <div className="text-center">
            <span className="font-display text-4xl text-[var(--accent)] block">{checkedRequired}/{totalRequired}</span>
            <span className="text-xs text-[var(--text-muted)]">Required Ticked</span>
          </div>
          <div className="text-center">
            <span className="font-display text-4xl text-[var(--accent)] block">{checkedOptional}/{totalOptional}</span>
            <span className="text-xs text-[var(--text-muted)]">Optional Ticked</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 bg-[var(--bg-soft)] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              complianceScore === 100 ? 'bg-green-500' : complianceScore >= 70 ? 'bg-[var(--accent)]' : 'bg-yellow-500'
            }`}
            style={{ width: `${complianceScore}%` }}
          />
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 text-center">
          {complianceScore === 100
            ? 'All required items ready — you can submit with confidence!'
            : `${totalRequired - checkedRequired} required items remaining`}
        </p>
      </div>

      {/* Category Checklists */}
      {TENDER_CATEGORIES.map((category) => (
        <Reveal key={category.name}>
          <div className="glass rounded-[var(--radius-lg)] overflow-hidden">
            <button
              onClick={() => setExpandedCategory(expandedCategory === category.name ? null : category.name)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div>
                <h4 className="font-display text-lg text-[var(--text)]">{category.name}</h4>
                <span className="text-xs text-[var(--text-muted)]">
                  {category.items.filter((item) => checkedItems[item.id]).length}/{category.items.length} completed
                </span>
              </div>
              <svg
                className={`w-5 h-5 text-[var(--text-muted)] transition-transform duration-300 ${
                  expandedCategory === category.name ? 'rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedCategory === category.name && (
              <div className="px-6 pb-6 space-y-3">
                {category.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[item.id] || false}
                      onChange={() => toggleItem(item.id)}
                      className="mt-1 w-4 h-4 accent-[var(--accent)]"
                    />
                    <div className="flex-1">
                      <span className={`text-sm ${checkedItems[item.id] ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'}`}>
                        {item.label}
                      </span>
                      {item.required && (
                        <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-red-500/20 text-red-400">
                          Required
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      ))}

      {/* CTA */}
      <Reveal>
        <div className="glass rounded-[var(--radius-lg)] p-8 text-center">
          <h4 className="font-display text-lg text-[var(--text)] mb-4">
            Need help with your tender?
          </h4>
          <p className="text-sm text-[var(--text-muted)] mb-6">
            We handle tender documentation, PP samples, and compliance for county and corporate tenders.
          </p>
          <Link href="/book?service=Tender+Compliance" className="btn-primary text-sm">
            Get Tender Support <span>→</span>
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
