"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface CatalogItem {
  id: string;
  sku: string;
  division: "branding" | "signage" | "awards";
  title: string;
  category: string;
  category_slug: string;
  description: string | null;
  badge: string | null;
  price_kes: number | null;
  image: string;
  specs: string[];
  turnaround: string | null;
  is_active: boolean;
  created_at: string;
}

const DIVISION_CATEGORIES: Record<string, string[]> = {
  branding: [
    "Apparel & Uniforms",
    "Executive Gift Sets",
    "Drinkware & Flasks",
    "Journals & Notebooks",
    "Metal Pens",
    "Bags & Totes",
    "Tech & Keychains",
  ],
  signage: [
    "3D Letters",
    "Standalone 3D",
    "Lightboxes",
    "Pylons & Totems",
    "2D Fascias",
    "Flex Neon",
    "Wayfinding",
    "Hybrid Specialty",
    "Fleet & Decals",
  ],
  awards: [
    "Crystal Towers & Obelisks",
    "Teak & Glass Plaques",
    "Flame & Star Trophies",
    "Shields & Metal Star Plaques",
    "Corporate Clocks & Medals",
  ],
};

export default function AdminCatalogPage() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDivision, setSelectedDivision] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Form State
  const [formDivision, setFormDivision] = useState<"branding" | "signage" | "awards">("branding");
  const [formTitle, setFormTitle] = useState("");
  const [formSku, setFormSku] = useState("");
  const [formCategory, setFormCategory] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formTurnaround, setFormTurnaround] = useState("3 - 5 Days");
  const [formSpecs, setFormSpecs] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  async function loadItems() {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedDivision !== "all") params.set("division", selectedDivision);
    if (search) params.set("search", search);

    try {
      const res = await fetch(`/api/admin/catalog?${params.toString()}`);
      if (res.ok) {
        setItems(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadItems();
  }, [selectedDivision, search]);

  function openCreateModal() {
    setEditingItem(null);
    setFormDivision((selectedDivision === "all" ? "branding" : selectedDivision) as any);
    setFormTitle("");
    setFormSku("");
    setFormCategory(DIVISION_CATEGORIES[selectedDivision === "all" ? "branding" : selectedDivision][0]);
    setFormPrice("");
    setFormTurnaround("3 - 5 Days");
    setFormSpecs("");
    setFormDescription("");
    setFormImageUrl("");
    setErrorMsg(null);
    setIsModalOpen(true);
  }

  function openEditModal(item: CatalogItem) {
    setEditingItem(item);
    setFormDivision(item.division);
    setFormTitle(item.title);
    setFormSku(item.sku || item.id);
    setFormCategory(item.category);
    setFormPrice(item.price_kes ? String(item.price_kes) : "");
    setFormTurnaround(item.turnaround || "3 - 5 Days");
    setFormSpecs((item.specs || []).join("\n"));
    setFormDescription(item.description || "");
    setFormImageUrl(item.image);
    setErrorMsg(null);
    setIsModalOpen(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("division", formDivision);

    try {
      const res = await fetch("/api/admin/catalog/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const data = await res.json();
      setFormImageUrl(data.publicUrl);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUploadingImage(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const specsArray = formSpecs
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formTitle,
      division: formDivision,
      category: formCategory,
      categorySlug: formCategory.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      priceKes: formPrice ? Number(formPrice) : null,
      turnaround: formTurnaround,
      specs: specsArray,
      description: formDescription,
      image: formImageUrl,
      sku: formSku,
      badge: formCategory,
    };

    try {
      let res;
      if (editingItem) {
        res = await fetch(`/api/admin/catalog/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/catalog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save item");
      }

      setIsModalOpen(false);
      loadItems();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleStatus(item: CatalogItem) {
    try {
      await fetch(`/api/admin/catalog/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.is_active }),
      });
      loadItems();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(item: CatalogItem) {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      await fetch(`/api/admin/catalog/${item.id}`, {
        method: "DELETE",
      });
      loadItems();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[var(--text)]">
            Product &amp; Works Catalog Manager
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Dynamic inventory controller — add items, upload photos directly to Supabase Storage, and update live pricing.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md whitespace-nowrap"
        >
          <span>+ Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card-theme rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["all", "branding", "signage", "awards"].map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedDivision === div
                  ? "bg-[var(--accent)] text-[var(--accent-ink)] shadow-xs"
                  : "bg-[var(--bg-soft)] text-[var(--text-muted)] hover:text-[var(--text)]"
              }`}
            >
              {div === "all" ? "All Divisions" : div}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search SKU, title, category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] focus:outline-none focus:border-[var(--accent)] text-[var(--text)]"
          />
        </div>
      </div>

      {/* Grid of Catalog Items */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="card-theme rounded-2xl h-80 animate-pulse bg-[var(--surface)]" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="card-theme rounded-2xl p-12 text-center text-[var(--text-muted)]">
          <p className="text-base font-semibold">No items match your criteria.</p>
          <p className="text-xs mt-1">Try clearing filters or click &quot;+ Add New Product&quot; to create one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className={`card-theme rounded-2xl overflow-hidden border border-[var(--border)] flex flex-col justify-between transition-all ${
                !item.is_active ? "opacity-60 grayscale" : ""
              }`}
            >
              {/* Product Card Top */}
              <div>
                <div className="relative aspect-[4/3] bg-neutral-900 border-b border-[var(--border)] group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider ${
                        item.division === "branding"
                          ? "bg-amber-500/90 text-white"
                          : item.division === "signage"
                          ? "bg-blue-600/90 text-white"
                          : "bg-rose-700/90 text-white"
                      }`}
                    >
                      {item.division}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[9px] font-mono bg-black/75 text-neutral-300">
                      {item.sku}
                    </span>
                  </div>

                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => toggleStatus(item)}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                        item.is_active ? "bg-emerald-500/90 text-white" : "bg-neutral-600 text-neutral-200"
                      }`}
                    >
                      {item.is_active ? "Live" : "Archived"}
                    </button>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[10px] font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="font-display text-sm font-bold text-[var(--text)] line-clamp-1">{item.title}</h3>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-sm font-bold text-[var(--text)]">
                      {item.price_kes ? `KES ${item.price_kes.toLocaleString()}` : "Custom Quote"}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-mono">{item.turnaround}</span>
                  </div>

                  {item.specs && item.specs.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.specs.slice(0, 2).map((sp, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[var(--bg-soft)] text-[9px] text-[var(--text-muted)] font-mono"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="p-4 pt-0 border-t border-[var(--border)] flex items-center justify-between gap-2 mt-2">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-[var(--bg-soft)] hover:bg-[var(--accent)]/15 text-[var(--text)] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="py-1.5 px-3 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="card-theme rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--border)] shadow-2xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <h2 className="font-display text-lg font-bold text-[var(--text)]">
                {editingItem ? "Edit Product Details" : "Add New Product to Live Catalog"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-soft)]"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    Division *
                  </label>
                  <select
                    value={formDivision}
                    onChange={(e) => {
                      const div = e.target.value as any;
                      setFormDivision(div);
                      setFormCategory(DIVISION_CATEGORIES[div][0]);
                    }}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  >
                    <option value="branding">Touchline Branding</option>
                    <option value="signage">Touchline Signage</option>
                    <option value="awards">Touchline Awards</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  >
                    {DIVISION_CATEGORIES[formDivision].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Executive Gift Ensemble"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SET-001"
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    Indicative Unit Price (KES)
                  </label>
                  <input
                    type="number"
                    placeholder="Leave blank for Custom Quote"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                    Turnaround Timeline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3 - 5 Days"
                    value={formTurnaround}
                    onChange={(e) => setFormTurnaround(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                  />
                </div>
              </div>

              {/* Photo Upload to Supabase Bucket */}
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] space-y-3">
                <label className="block text-xs font-mono uppercase text-[var(--text-muted)] font-semibold">
                  Product Photography * (Uploads to Supabase Storage Bucket)
                </label>

                <div className="flex items-center gap-4">
                  {formImageUrl ? (
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[var(--border)] bg-neutral-900 shrink-0">
                      <Image src={formImageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl border border-dashed border-[var(--border)] flex items-center justify-center text-[10px] text-[var(--text-muted)] font-mono shrink-0">
                      No Image
                    </div>
                  )}

                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/webp,image/png,image/jpeg"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={uploadingImage}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--surface)] border border-[var(--border)] hover:bg-[var(--bg)] text-[var(--text)] transition-all shadow-xs"
                    >
                      {uploadingImage ? "Uploading to Bucket..." : "Select Photo from Device"}
                    </button>
                    <p className="text-[10px] text-[var(--text-muted)]">
                      Supported formats: WebP, PNG, JPEG. Automatically organized into /{formDivision}/catalog/.
                    </p>
                  </div>
                </div>

                {formImageUrl && (
                  <div className="text-[10px] font-mono text-[var(--text-muted)] truncate">
                    CDN: {formImageUrl}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Technical Specifications (one per line)
                </label>
                <textarea
                  rows={3}
                  placeholder={"1200 GSM Rigid Keepsake Box\nCustom High-Density Foam Cutout\nHot Foil / UV Branded"}
                  value={formSpecs}
                  onChange={(e) => setFormSpecs(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--text-muted)] mb-1">
                  Procurement Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Official description displayed in technical spec modals and downloadable PDF catalog..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage || !formImageUrl}
                  className="btn-primary px-6 py-2.5 rounded-xl text-xs font-semibold shadow-md disabled:opacity-50"
                >
                  {saving ? "Saving to Database..." : editingItem ? "Update Product" : "Publish to Live Catalog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
