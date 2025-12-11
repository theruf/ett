"use client";

import { useMemo, useState } from "react";
import { ProductWithSlug } from "@/lib/products";
import ProductCard from "./ProductCard";

/**
 * Product grid component (Fjord style)
 *
 * Features:
 * - 2 columns on mobile
 * - 4 columns on desktop (like Fjord)
 * - Minimal spacing (12px gaps)
 */

type SortOrder = "default" | "priceDesc" | "priceAsc" | "newest" | "oldest";

interface ProductGridProps {
  products: ProductWithSlug[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    if (sortOrder === "priceDesc") {
      return [...products].sort(
        (a, b) => (b.price ?? 0) - (a.price ?? 0)
      );
    }
    if (sortOrder === "priceAsc") {
      return [...products].sort(
        (a, b) => (a.price ?? 0) - (b.price ?? 0)
      );
    }
    if (sortOrder === "newest") {
      return [...products].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }
    if (sortOrder === "oldest") {
      return [...products].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    }
    return products;
  }, [products, sortOrder]);

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="so-body">
          Товары не найдены
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-6">
        <select
          className="so-body text-gray-dark bg-transparent outline-none px-0 py-0 pr-2 border-none appearance-none"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value as SortOrder)
          }
        >
          <option value="default">Сортировать: по умолчанию</option>
          <option value="priceDesc">Цена: по убыванию</option>
          <option value="priceAsc">Цена: по возрастанию</option>
          <option value="newest">Дата: новые</option>
          <option value="oldest">Дата: старые</option>
        </select>
        <div className="so-body text-gray-dark">{sortedProducts.length} товаров</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sortedProducts.map((product, index) => (
          <div
            key={product.id}
            className="animate-fade-up"
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </>
  );
}
