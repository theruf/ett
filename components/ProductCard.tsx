"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [index, setIndex] = useState(0);
  const images = product.images;

  const prev = () => {
    setIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const next = () => {
    setIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="block bg-white overflow-hidden transition-opacity hover:opacity-70 animate-fade-up"
    >
      {/* Product image - portrait 3:4 ratio */}
      <div
        className="relative w-full bg-gray-lightest overflow-hidden mb-3 rounded-sm"
        style={{ aspectRatio: "1 / 1" }}
      >
        {product.images.length > 0 && (
          <Image
            src={images[index]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 50vw, 25vw"
          />
        )}

        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-dark px-2 py-1 so-meta"
              onClick={(e) => {
                e.preventDefault();
                prev();
              }}
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-dark px-2 py-1 so-meta"
              onClick={(e) => {
                e.preventDefault();
                next();
              }}
              aria-label="Next image"
            >
              →
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, i) => (
                <span
                  key={product.id + i}
                  className={`h-1.5 w-4 ${i === index ? "bg-gray-dark" : "bg-white/70"}`}
                />
              ))}
            </div>
          </>
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
