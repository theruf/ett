"use client";

import { useEffect, useMemo, useState } from "react";
import { Product, Category } from "@/lib/types";
import { categoryLabels } from "@/types/product";

type FormState = Partial<Product> & { images: string[]; priceText?: string };

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price).replace(/,/g, " ");
};

const emptyForm: FormState = {
  title: "",
  category: "clothing",
  price: null,
  currency: "RUB",
  short_description: "",
  long_description: "",
  images: [""],
  external_url: "",
  source_label: "",
  is_sponsored: false,
  is_affiliate: false,
  priceText: "",
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
    setError(null);
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/products?${params.toString()}`);
    if (!res.ok) {
      setError("Не удалось загрузить товары");
      setLoading(false);
      return;
    }
    const data: Product[] = await res.json();
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
    if (!confirm("Удалить этот товар?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Не удалось удалить товар");
      return;
    }
    fetchProducts();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    const images = (form.images || []).filter(Boolean);
    if (!images.length) {
      setError("Добавьте хотя бы одну ссылку на изображение");
      return;
    }

    const rawPrice = form.priceText ?? "";
    const cleanedPrice = rawPrice.trim();
    let priceNumber: number | null = null;
    if (cleanedPrice) {
      const noSpaces = cleanedPrice.replace(/\s+/g, "");
      const hasComma = noSpaces.includes(",");
      const hasDot = noSpaces.includes(".");
      let normalized = noSpaces;
      if (hasComma && !hasDot) {
        // трактуем запятые как разделители тысяч
        normalized = normalized.replace(/,/g, "");
      } else {
        // переводим запятые в точки для дробной части
        normalized = normalized.replace(/,/g, ".");
      }
      normalized = normalized.replace(/[^\d.]/g, "");
      priceNumber = normalized ? Number.parseFloat(normalized) : null;
      if (normalized && Number.isNaN(priceNumber)) {
        setError("Проверьте формат цены");
        return;
      }
    }

    const payload = {
      title: form.title || "",
      category: (form.category as Category) || "clothing",
      price: priceNumber,
      currency: (form.currency || "RUB").trim(),
      short_description: form.short_description || null,
      long_description: form.long_description || null,
      images,
      external_url: form.external_url || "",
      source_label: form.source_label || null,
      is_sponsored: !!form.is_sponsored,
      is_affiliate: !!form.is_affiliate,
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
      setError(data.error ? JSON.stringify(data.error) : "Не удалось сохранить");
      return;
    }
    setMessage("Сохранено");
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

  const moveImage = (from: number, to: number) => {
    setForm((prev) => {
      const images = [...(prev.images || [])];
      if (to < 0 || to >= images.length) return prev;
      const [item] = images.splice(from, 1);
      images.splice(to, 0, item);
      return { ...prev, images };
    });
  };

  const isVideo = (src: string) => /\.mp4(\?|$)/i.test(src);

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-white px-5 sm:px-8 md:px-10 py-6">
      <div className="max-w-screen-2xl mx-auto flex flex-col gap-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-light pb-4">
          <div>
            <h1 className="so-heading text-gray-dark">ÉTT Market — админка</h1>
            <p className="so-body text-gray-text">Управление подборками товаров</p>
          </div>
          <button
            onClick={handleLogout}
            className="so-body text-gray-dark border border-gray-light px-3 py-1"
          >
            Выйти
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
                  <option value="all">Все</option>
                  <option value="clothing">Одежда</option>
                  <option value="accessories">Аксессуары</option>
                  <option value="gadgets">Гаджеты</option>
                  <option value="home">Дом</option>
                </select>
                <input
                  className="border border-gray-light px-3 py-2 so-body"
                  placeholder="Поиск"
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
                Добавить товар
              </button>
            </div>
            <button
              className="so-meta text-gray-text text-left"
              onClick={fetchProducts}
            >
              Обновить
            </button>
            {loading ? (
              <p className="so-body text-gray-text">Загрузка...</p>
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
                        {categoryLabels[p.category as Category]} •
                        {p.price !== null && p.price !== undefined ? ` ${formatPrice(p.price)}` : ""} {p.currency || ""}
                        {p.source_label ? ` • ${p.source_label}` : ""}
                      </p>
                      <p className="so-meta text-gray-text">
                        {p.is_sponsored ? "Реклама" : ""} {p.is_affiliate ? "Партнерский товар" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="so-meta text-gray-dark border border-gray-light px-2 py-1"
                        onClick={() => handleEdit(p)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="so-meta text-gray-text border border-gray-light px-2 py-1"
                        onClick={() => handleDelete(p.id)}
                      >
                        Удалить
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
              <h2 className="so-heading text-gray-dark">{editing ? "Редактировать товар" : "Новый товар"}</h2>
              {message && <span className="so-meta text-green-600">{message}</span>}
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div>
                <label className="so-body text-gray-dark mb-1 block">Название *</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[160px]">
                  <label className="so-body text-gray-dark mb-1 block">Категория</label>
                <select
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                >
                  <option value="clothing">Одежда</option>
                <option value="accessories">Аксессуары</option>
                <option value="gadgets">Гаджеты</option>
                <option value="home">Дом</option>
                </select>
                </div>
                <div className="flex-1 min-w-[120px]">
                  <label className="so-body text-gray-dark mb-1 block">Цена</label>
                  <input
                    type="text"
                    className="w-full border border-gray-light px-3 py-2 so-body"
                    value={form.priceText ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, priceText: e.target.value })
                    }
                    placeholder="Цена"
                  />
                </div>
                <div className="w-28">
                  <label className="so-body text-gray-dark mb-1 block">Валюта</label>
                  <input
                    className="w-full border border-gray-light px-3 py-2 so-body"
                    value={form.currency || ""}
                    onChange={(e) => setForm({ ...form, currency: e.target.value })}
                    placeholder="RUB"
                  />
                </div>
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Краткое описание</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.short_description || ""}
                  onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                />
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Подробное описание</label>
                <textarea
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  rows={4}
                  value={form.long_description || ""}
                  onChange={(e) => setForm({ ...form, long_description: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="so-body text-gray-dark">Изображения (URL) *</label>
                  <button type="button" className="so-meta text-gray-dark" onClick={addImageField}>
                    + Добавить изображение
                  </button>
                </div>
                {(form.images || []).map((img, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="relative w-12 h-12 bg-gray-lightest border border-gray-light overflow-hidden">
                      {img ? (
                        isVideo(img) ? (
                          <video
                            src={img}
                            className="absolute inset-0 h-full w-full object-cover"
                            muted
                            loop
                            autoPlay
                            playsInline
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img} alt={`preview-${idx}`} className="absolute inset-0 h-full w-full object-cover" />
                        )
                      ) : null}
                    </div>
                    <input
                      className="w-full border border-gray-light px-3 py-2 so-body"
                      value={img}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      required={idx === 0}
                      placeholder="https://..."
                    />
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        className="so-meta text-gray-text border border-gray-light px-2 py-1"
                        onClick={() => moveImage(idx, idx - 1)}
                        disabled={idx === 0}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="so-meta text-gray-text border border-gray-light px-2 py-1"
                        onClick={() => moveImage(idx, idx + 1)}
                        disabled={idx === (form.images?.length || 1) - 1}
                      >
                        ↓
                      </button>
                    </div>
                  <button
                    type="button"
                    className="so-meta text-gray-text border border-gray-light px-2 py-1"
                    onClick={() => removeImageField(idx)}
                  >
                    Удалить
                  </button>
                  </div>
                ))}
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Ссылка на маркетплейс *</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.external_url || ""}
                  onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="so-body text-gray-dark mb-1 block">Маркетплейс</label>
                <input
                  className="w-full border border-gray-light px-3 py-2 so-body"
                  value={form.source_label || ""}
                  onChange={(e) => setForm({ ...form, source_label: e.target.value })}
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 so-body text-gray-dark">
                  <input
                    type="checkbox"
                    checked={form.is_sponsored || false}
                    onChange={(e) => setForm({ ...form, is_sponsored: e.target.checked })}
                  />
                  Реклама
                </label>
                <label className="flex items-center gap-2 so-body text-gray-dark">
                  <input
                    type="checkbox"
                    checked={form.is_affiliate || false}
                    onChange={(e) => setForm({ ...form, is_affiliate: e.target.checked })}
                  />
                  Партнерский товар
                </label>
              </div>

              {error && <p className="so-body text-red-500">{error}</p>}

              <div className="flex items-center gap-3">
                <button type="submit" className="border border-gray-light px-4 py-2 so-body bg-white text-gray-dark">
                  Сохранить
                </button>
                <button
                  type="button"
                  className="border border-gray-light px-4 py-2 so-body text-gray-text"
                  onClick={() => {
                    setEditing(null);
                    setForm(emptyForm);
                  }}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
