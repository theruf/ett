"use client";

import { useEffect, useMemo, useState } from "react";
import { Product, Category } from "@/lib/products/types";

type FormState = Partial<Product> & { images: string[] };

const emptyForm: FormState = {
  title: "",
  category: "clothing",
  price: undefined,
  currency: "USD",
  shortDescription: "",
  longDescription: "",
  images: [""],
  externalUrl: "",
  sourceLabel: "",
  isSponsored: false,
  isAffiliate: false,
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/products?${params.toString()}`);
    if (!res.ok) {
      setError("Failed to load products");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => products, [products]);

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm({ ...p, images: p.images.length ? p.images : [""] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete");
      return;
    }
    fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const payload = {
      ...form,
      price: form.price ? Number(form.price) : undefined,
    };
    const isEdit = Boolean(editing?.id);
    const url = isEdit ? `/api/admin/products/${editing?.id}` : "/api/admin/products";
    const method = isEdit ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error ? JSON.stringify(data.error) : "Save failed");
      return;
    }
    setMessage("Saved successfully");
    setForm(emptyForm);
    setEditing(null);
    fetchProducts();
  };

  const handleImageChange = (idx: number, value: string) => {
    setForm((prev) => {
      const images = [...(prev.images || [])];
      images[idx] = value;
      return { ...prev, images };
    });
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...(prev.images || []), ""] }));
  };

  const removeImageField = (idx: number) => {
    setForm((prev) => {
      const images = [...(prev.images || [])];
      images.splice(idx, 1);
      return { ...prev, images: images.length ? images : [""] };
    });
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-white px-5 sm:px-8 md:px-10 py-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-light pb-4">
          <div>
            <h1 className="so-heading text-gray-dark">ÉTT Market Admin</h1>
            <p className="so-body text-gray-text">Manage curated products</p>
          </div>
          <button
            onClick={handleLogout}
            className="so-body text-gray-dark border border-gray-light px-3 py-1"
          >
            Log out
          </button>
        </header>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* List */}
          <div className="md:w-1/2 w-full border border-gray-light p-4 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="flex items-center gap-3">
                <select
                  className="border border-gray-light px-3 py-2 so-body"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "all")}
                >
                  <option value="all">All</option>
                  <option value="clothing">Clothing</option>
                  <option value="accessories">Accessories</option>
                  <option value="gadgets">Gadgets</option>
                  <option value="apps">Apps</option>
                </select>
                <input
                  className="border border-gray-light px-3 py-2 so-body"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") fetchProducts();
                  }}
                />
              </div>
              <button
                className="border border-gray-light px-3 py-2 so-body"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyForm);
                }}
              >
                Add product
              </button>
            </div>
            <button
              className="so-meta text-gray-text text-left"
              onClick={fetchProducts}
            >
              Refresh
            </button>
            {loading ? (
              <p className="so-body text-gray-text">Loading...</p>
            ) : (
              <div className="flex flex-col gap-2 max-h-[65vh] overflow-auto">
                {filtered.map((p) => (
                  <div
                    key={p.id}
                    className="border border-gray-light px-3 py-2 flex items-center justify-between gap-3"
                  >
                    <div className="flex-1">
                      <p className="so-body text-gray-dark">{p.title}</p>
                      <p className="so-meta text-gray-text">
                        {p.category} • {p.currency || "USD"}{p.price ? ` ${p.price}` : ""} • {p.sourceLabel || ""}
                      </p>
                      <p className="so-meta text-gray-text">
                        {p.isSponsored ? "Sponsored" : ""} {p.isAffiliate ? "Affiliate" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="so-meta text-gray-dark border border-gray-light px-2 py-1"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="so-meta text-gray-text border border-gray-light px-2 py-1"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {error && <p className="so-body text-red-500">{error}</p>}
          </div>

          {/* Form */}
          <div className="md:w-1/2 w-full border border-gray-light p-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="so-heading text-gray-dark">{editing ? "Edit product" : "New product"}</h2>
              {message && <span className="so-meta text-green-600">{message}</span>}
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="so-body text-gray-dark mb-1 block">Title *</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[160px]">
                  <label className="so-body text-gray-dark mb-1 block">Category</label>
                  <select
                    className="w-full border border-gray-light px-3 py-2 so-body"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  >
                    <option value="clothing">Clothing</option>
                    <option value="accessories">Accessories</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="apps">Apps</option>
                  </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="so-body text-gray-dark mb-1 block">Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-light px-3 py-2 so-body"
                    value={form.price ?? ""}
                    onChange={(e) => setForm({ ...form, price: e.target.value ? Number(e.target.value) : undefined })}
                    min={0}
                    step="0.01"
                  />
                </div>
                <div className="w-24">
                  <label className="so-body text-gray-dark mb-1 block">Currency</label>
                  <input
                    className="w-full border border-gray-light px-3 py-2 so-body"
                    value={form.currency || "USD"}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Short description</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.shortDescription || ""}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                />
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Long description</label>
                <textarea
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  rows={4}
                  value={form.longDescription || ""}
                  onChange={(e) => setForm({ ...form, longDescription: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="so-body text-gray-dark">Images (URLs) *</label>
                  <button type="button" className="so-meta text-gray-dark" onClick={addImageField}>
                    + Add image
                  </button>
                </div>
                {(form.images || []).map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      className="w-full border border-gray-light px-3 py-2 so-body"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      required={idx === 0}
                      placeholder="https://..."
                    />
                    <button
                      type="button"
                      className="so-meta text-gray-text border border-gray-light px-2 py-1"
                      onClick={() => removeImageField(idx)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">External URL *</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.externalUrl || ""}
                  onChange={(e) => setForm({ ...form, externalUrl: e.target.value })}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 so-body text-gray-dark">
                  <input
                    type="checkbox"
                    checked={form.isSponsored || false}
                    onChange={(e) => setForm({ ...form, isSponsored: e.target.checked })}
                  />
                  Sponsored
                </label>
                <label className="flex items-center gap-2 so-body text-gray-dark">
                  <input
                    type="checkbox"
                    checked={form.isAffiliate || false}
                    onChange={(e) => setForm({ ...form, isAffiliate: e.target.checked })}
                  />
                  Affiliate
                </label>
              </div>

              {error && <p className="so-body text-red-500">{error}</p>}

              <div className="flex items-center gap-3">
                <button type="submit" className="border border-gray-light px-4 py-2 so-body bg-white text-gray-dark">
                  Save
                </button>
                <button
                  type="button"
                  className="border border-gray-light px-4 py-2 so-body text-gray-text"
                  onClick={() => {
                    setEditing(null);
                    setForm(emptyForm);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
