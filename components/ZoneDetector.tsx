'use client';

import { useState, useEffect } from 'react';
import {
  detectClimateZone,
  getSeasonalRecommendations,
  CLIMATE_ZONES,
  HOT_PRODUCTS_KE,
  GLOBAL_TRENDS_2026,
  type ClimateZone,
} from '@/config/branding-knowledge';

const ZONE_ICONS: Record<ClimateZone, React.ReactNode> = {
  coastal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M2 16c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M8 10l4-6 4 6" /></svg>,
  highland: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M12 2L2 22h20L12 2z" /><path d="M8 14l4-6 4 6" /></svg>,
  lake: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M2 16c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M2 20c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" /><path d="M8 10l4-6 4 6" /></svg>,
  arid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path d="M2 20h20" /><circle cx="12" cy="8" r="4" /><path d="M4 16c1-2 3-3 5-3s3 1 5 3" /><path d="M14 14c1-1 2-2 4-2" /></svg>,
  urban: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><rect x="1" y="6" width="6" height="16" rx="1" /><rect x="9" y="2" width="6" height="20" rx="1" /><rect x="17" y="8" width="6" height="14" rx="1" /><line x1="4" y1="10" x2="4" y2="10.01" /><line x1="4" y1="14" x2="4" y2="14.01" /><line x1="12" y1="6" x2="12" y2="6.01" /><line x1="12" y1="10" x2="12" y2="10.01" /><line x1="20" y1="12" x2="20" y2="12.01" /><line x1="20" y1="16" x2="20" y2="16.01" /></svg>,
};

const ZONE_DESCRIPTIONS: Record<ClimateZone, string> = {
  coastal: 'Hot & humid with salt air — requires marine-grade materials and UV-resistant finishes',
  highland: 'Mild with temperature fluctuations — standard materials generally perform well',
  lake: 'Wet & tropical with high humidity — moisture-resistant materials essential',
  arid: 'Extreme heat with intense UV — UV-resistant coatings mandatory',
  urban: 'High traffic with pollution — durable, cleanable surfaces recommended',
};

export function ZoneDetector() {
  const [location, setLocation] = useState('');
  const [detectedZone, setDetectedZone] = useState<ClimateZone | null>(null);
  const [currentMonth] = useState(() => new Date().getMonth() + 1);
  const [seasonal, setSeasonal] = useState(() => getSeasonalRecommendations(new Date().getMonth() + 1));

  useEffect(() => {
    if (location.length > 2) {
      const zone = detectClimateZone(location);
      setDetectedZone(zone);
    }
  }, [location]);

  const zoneData = detectedZone ? CLIMATE_ZONES[detectedZone] : null;

  return (
    <div className="space-y-8">
      {/* Zone Input */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <h3 className="font-display text-xl mb-4 text-[var(--text)]">Zone-Aware Branding</h3>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Enter your location to get material and branding recommendations for your climate zone.
        </p>

        <div className="relative">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Mombasa, Nairobi, Kisumu..."
            className="w-full bg-transparent border-b-2 border-[var(--border)] pb-3 text-[var(--text)] placeholder:text-[var(--border)] focus:border-[var(--accent)] focus:outline-none transition-colors rounded-none text-lg"
          />
          {detectedZone && (
            <div className="absolute right-0 top-0 flex items-center gap-2">
              <span className="text-[var(--accent)]">{ZONE_ICONS[detectedZone]}</span>
              <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest">
                {detectedZone} zone
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Zone Results */}
      {zoneData && (
        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-up">
          {/* Climate Conditions */}
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <h4 className="font-display text-lg mb-4 text-[var(--text)]">Climate Conditions</h4>
            <p className="text-sm text-[var(--text-muted)] mb-4">{ZONE_DESCRIPTIONS[detectedZone!]}</p>
            <div className="flex flex-wrap gap-2">
              {zoneData.conditions.map((cond) => (
                <span key={cond} className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-mono">
                  {cond}
                </span>
              ))}
            </div>
          </div>

          {/* Material Recommendations */}
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <h4 className="font-display text-lg mb-4 text-[var(--text)]">Recommended Materials</h4>
            <ul className="space-y-2">
              {zoneData.materialRecommendations.slice(0, 5).map((mat) => (
                <li key={mat} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--accent)] mt-0.5">✓</span>
                  {mat}
                </li>
              ))}
            </ul>
          </div>

          {/* Durability Guidelines */}
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <h4 className="font-display text-lg mb-4 text-[var(--text)]">Durability Tips</h4>
            <ul className="space-y-2">
              {zoneData.durabilityGuidelines.map((tip) => (
                <li key={tip} className="flex items-start gap-2 text-sm text-[var(--text-muted)]">
                  <span className="text-yellow-500 mt-0.5">⚠</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Best Methods */}
          <div className="glass rounded-[var(--radius-lg)] p-6">
            <h4 className="font-display text-lg mb-4 text-[var(--text)]">Best Branding Methods</h4>
            <div className="flex flex-wrap gap-2">
              {zoneData.brandingMethods.map((method) => (
                <span key={method} className="px-3 py-1 rounded-full bg-[var(--accent)] text-[var(--accent-ink)] text-xs font-mono uppercase">
                  {method.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Seasonal Recommendations */}
      <div className="glass rounded-[var(--radius-lg)] p-8">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-display text-lg text-[var(--text)]">Seasonal Demand — {seasonal.reason}</h4>
          <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest ${
            seasonal.demand === 'peak' ? 'bg-red-500/20 text-red-400' :
            seasonal.demand === 'very-high' ? 'bg-orange-500/20 text-orange-400' :
            seasonal.demand === 'high' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-[var(--accent)]/20 text-[var(--accent)]'
          }`}>
            {seasonal.demand} demand
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          {seasonal.items.map((item) => (
            <span key={item} className="px-4 py-2 rounded-full bg-[var(--bg-soft)] text-[var(--text)] text-sm border border-[var(--border)]">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-[var(--radius-md)] p-4 text-center">
          <span className="font-display text-2xl text-[var(--accent)] block">142</span>
          <span className="text-xs text-[var(--text-muted)]">Suppliers in Kenya</span>
        </div>
        <div className="glass rounded-[var(--radius-md)] p-4 text-center">
          <span className="font-display text-2xl text-[var(--accent)] block">86.6%</span>
          <span className="text-xs text-[var(--text-muted)]">Based in Nairobi</span>
        </div>
        <div className="glass rounded-[var(--radius-md)] p-4 text-center">
          <span className="font-display text-2xl text-[var(--accent)] block">$377M</span>
          <span className="text-xs text-[var(--text-muted)]">Licensed Merchandise</span>
        </div>
        <div className="glass rounded-[var(--radius-md)] p-4 text-center">
          <span className="font-display text-2xl text-[var(--accent)] block">4.8%</span>
          <span className="text-xs text-[var(--text-muted)]">CAGR 2026-2032</span>
        </div>
      </div>
    </div>
  );
}
