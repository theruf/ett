"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

/**
 * Product grid component (Fjord style)
 *
 * Features:
 * - 2 columns on mobile
 * - 4 columns on desktop (like Fjord)
 * - Minimal spacing (12px gaps)
 */

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [sortOrder, setSortOrder] = useState<
    "default" | "priceDesc" | "priceAsc"
  >("default");

  const sortedProducts = useMemo(() => {
    if (sortOrder === "priceDesc") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    if (sortOrder === "priceAsc") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    return products;
  }, [products, sortOrder]);

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="so-body">
          No products in this category yet
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="border border-gray-light px-4 py-2 bg-white rounded-sm">
          <select
            className="so-body text-gray-dark bg-transparent outline-none pr-6"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "default" | "priceDesc" | "priceAsc")
            }
          >
            <option value="default">Sort by Default</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="priceAsc">Price: Low to High</option>
          </select>
        </div>
        <div className="so-body text-gray-dark">{sortedProducts.length} items</div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
