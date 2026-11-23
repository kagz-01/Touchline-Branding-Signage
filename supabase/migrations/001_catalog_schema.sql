-- ============================================================
-- Touchline Platform — Catalog & Content Schema
-- Migration: 001_catalog_schema
-- Run via: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ── CATALOG ITEMS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS catalog_items (
  id              TEXT PRIMARY KEY,                     -- e.g. "SET-001", "SIG-3D-01"
  sku             TEXT,
  division        TEXT NOT NULL CHECK (division IN ('branding', 'signage', 'awards')),
  title           TEXT NOT NULL,
  category        TEXT NOT NULL,
  category_slug   TEXT NOT NULL,
  description     TEXT,
  badge           TEXT,
  price_kes       INTEGER,                              -- NULL for signage items
  image           TEXT NOT NULL,
  specs           TEXT[] DEFAULT '{}',
  applications    TEXT,
  turnaround      TEXT,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── CATALOG CATEGORIES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS catalog_categories (
  slug            TEXT NOT NULL,
  division        TEXT NOT NULL CHECK (division IN ('branding', 'signage', 'awards')),
  label           TEXT NOT NULL,
  sort_order      INTEGER DEFAULT 0,
  PRIMARY KEY (slug, division)
);

-- ── SERVICES (from BrandConfig.serviceCategories) ────────────
CREATE TABLE IF NOT EXISTS services (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  division        TEXT NOT NULL CHECK (division IN ('branding', 'signage')),
  category_name   TEXT NOT NULL,
  category_desc   TEXT,
  service_name    TEXT NOT NULL,
  service_desc    TEXT,
  best_for        TEXT,
  sort_order      INTEGER DEFAULT 0,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── TESTIMONIALS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  division        TEXT NOT NULL CHECK (division IN ('branding', 'signage', 'hub')),
  quote           TEXT NOT NULL,
  author_name     TEXT NOT NULL,
  author_role     TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SITE CONFIG (admin-editable key/value store) ─────────────
CREATE TABLE IF NOT EXISTS site_config (
  key             TEXT PRIMARY KEY,
  value           TEXT,
  value_json      JSONB,
  description     TEXT,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── INDEXES ──────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_catalog_items_division      ON catalog_items(division);
CREATE INDEX IF NOT EXISTS idx_catalog_items_category_slug ON catalog_items(category_slug);
CREATE INDEX IF NOT EXISTS idx_catalog_items_is_active     ON catalog_items(is_active);
CREATE INDEX IF NOT EXISTS idx_services_division           ON services(division);
CREATE INDEX IF NOT EXISTS idx_testimonials_division       ON testimonials(division);

-- ── RLS (Row Level Security) ─────────────────────────────────
-- Public reads for catalog/testimonials/services
ALTER TABLE catalog_items    ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials     ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config      ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access (public catalog)
CREATE POLICY "Public read catalog_items"
  ON catalog_items FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read catalog_categories"
  ON catalog_categories FOR SELECT USING (TRUE);

CREATE POLICY "Public read services"
  ON services FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public read testimonials"
  ON testimonials FOR SELECT USING (is_active = TRUE);

-- Only service role can write (admin seeding, dashboard mutations)
CREATE POLICY "Service role write catalog_items"
  ON catalog_items FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write catalog_categories"
  ON catalog_categories FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write services"
  ON services FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write testimonials"
  ON testimonials FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role write site_config"
  ON site_config FOR ALL USING (auth.role() = 'service_role');

-- ── UPDATED_AT TRIGGER ───────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER catalog_items_updated_at
  BEFORE UPDATE ON catalog_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
