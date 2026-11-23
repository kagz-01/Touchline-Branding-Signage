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
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Documentation');

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
    <div className="space-y-6">
      {/* Compliance Score Card */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 border border-[var(--border)] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[var(--border)]">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text)]">
              Tender &amp; Statutory Compliance Evaluator
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
              Verify your documentation and sample specs against Kenyan County &amp; PPRA statutory requirements.
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold w-fit">
            PPRA Audit Protocol
          </span>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
          <div className="card-surface p-4 rounded-xl border border-[var(--border)] text-center shadow-xs">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Readiness Score
            </span>
            <span className="font-display text-2xl sm:text-4xl font-bold text-[var(--accent)] block">
              {complianceScore}%
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Mandatory Audit</span>
          </div>

          <div className="card-surface p-4 rounded-xl border border-[var(--border)] text-center shadow-xs">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Required Items
            </span>
            <span className="font-display text-2xl sm:text-4xl font-bold text-[var(--text)] block">
              {checkedRequired}/{totalRequired}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Ticked Ready</span>
          </div>

          <div className="card-surface p-4 rounded-xl border border-[var(--border)] text-center shadow-xs">
            <span className="font-mono text-[10px] text-[var(--text-muted)] uppercase tracking-wider block mb-1">
              Optional Add-ons
            </span>
            <span className="font-display text-2xl sm:text-4xl font-bold text-[var(--text-muted)] block">
              {checkedOptional}/{totalOptional}
            </span>
            <span className="text-[10px] font-mono text-[var(--text-muted)]">Bonus Points</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2.5 bg-[var(--bg-soft)] rounded-full overflow-hidden border border-[var(--border)]">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                complianceScore === 100
                  ? 'bg-emerald-500'
                  : complianceScore >= 60
                  ? 'bg-[var(--accent)]'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${complianceScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
            <span>
              {complianceScore === 100
                ? '✅ All mandatory items satisfied'
                : `${totalRequired - checkedRequired} mandatory statutory items remaining`}
            </span>
            <span className="font-bold text-[var(--accent)]">{complianceScore}% Certified</span>
          </div>
        </div>
      </div>

      {/* Category Checklists (Accordion cards) */}
      <div className="space-y-3">
        {TENDER_CATEGORIES.map((category) => {
          const isExpanded = expandedCategory === category.name;
          const completedCount = category.items.filter((item) => checkedItems[item.id]).length;

          return (
            <div
              key={category.name}
              className="card-surface rounded-xl border border-[var(--border)] overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setExpandedCategory(isExpanded ? null : category.name)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[var(--bg-soft)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${completedCount === category.items.length ? 'bg-emerald-500' : 'bg-[var(--accent)]'}`} />
                  <div>
                    <h4 className="font-display text-base font-bold text-[var(--text)]">{category.name}</h4>
                    <span className="text-[11px] font-mono text-[var(--text-muted)]">
                      {completedCount} of {category.items.length} verified
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[var(--bg-soft)] border border-[var(--border)] text-[var(--text)]">
                    {Math.round((completedCount / category.items.length) * 100)}%
                  </span>
                  <svg
                    className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-[var(--border)] bg-[var(--surface)] space-y-2.5">
                  {category.items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[var(--bg-soft)] hover:bg-[var(--border)]/30 cursor-pointer border border-[var(--border)] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={checkedItems[item.id] || false}
                          onChange={() => toggleItem(item.id)}
                          className="w-4 h-4 rounded border-[var(--border)] accent-[var(--accent)] cursor-pointer"
                        />
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            checkedItems[item.id] ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text)]'
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                      {item.required ? (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
                          Mandatory
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[9px] font-mono text-[var(--text-muted)] uppercase shrink-0">
                          Optional
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="card-surface rounded-2xl p-6 sm:p-8 border border-[var(--border)] text-center shadow-xs">
        <h4 className="font-display text-lg font-bold text-[var(--text)] mb-2">
          Need Pre-Production Samples &amp; Official Tender Dossiers?
        </h4>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] mb-5 max-w-xl mx-auto leading-relaxed">
          Touchline delivers sealed strike-off garment samples, verified substrate spec sheets, and KRA ETR itemized quotations for procurement evaluation committees.
        </p>
        <Link
          href="/book?brand=branding&service=Tender+Compliance"
          className="btn-primary text-xs font-semibold py-2.5 px-6 inline-flex items-center gap-2"
        >
          <span>Request Official Tender Sample Pack</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
