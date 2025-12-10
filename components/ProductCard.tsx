"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white overflow-hidden transition-opacity hover:opacity-70 animate-fade-up"
    >
      {/* Product image - portrait 3:4 ratio */}
      <div
        className="relative w-full bg-gray-lightest overflow-hidden mb-3"
        style={{ aspectRatio: "1 / 1" }}
      >
        {product.images.length > 0 && (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        )}
      </div>

      {/* Card content */}
      <div className="px-0.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="so-body text-gray-dark font-normal mb-0.5 line-clamp-2 flex-1">
            {product.title}
          </h3>
          <p className="text-[10px] text-gray-text shrink-0">
            {product.price !== null ? `$${product.price}` : ""}
          </p>
        </div>
        <p
          className={`so-meta text-gray-text ${
            product.is_sponsored ? "" : "invisible"
          }`}
        >
          Sponsored
        </p>
      </div>
    </Link>
  );
}
