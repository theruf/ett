"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Product } from "@/lib/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const images = product.images;

  const prev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const next = () => {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  const mainImage = useMemo(() => images[index], [images, index]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
      <div className="flex flex-col gap-3 order-1">
        <div
          className="relative w-full bg-gray-lightest overflow-hidden"
          style={{ aspectRatio: "1 / 1" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {images.length > 0 && (
            <Image
              src={mainImage}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img + i}
                className={`relative shrink-0 border ${i === index ? "border-gray-dark" : "border-gray-light"}`}
                style={{ width: 64, height: 64 }}
                onClick={() => setIndex(i)}
                aria-label={`Select image ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${product.title} thumbnail ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 order-2 lg:order-1">
        <div className="flex flex-col gap-1">
          <p className="so-body text-gray-text capitalize">{product.category}</p>
          <div className="flex items-end gap-2">
            <h1 className="so-heading text-gray-dark flex-1">{product.title}</h1>
            {product.price !== null && (
              <p className="so-heading font-normal text-gray-dark text-right leading-tight self-end">
                {`$${product.price}`}
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-gray-light pt-6 flex flex-col gap-3">
          <h2 className="so-body text-gray-dark">Description</h2>
          <p className="so-body text-gray-text">
            {product.long_description || product.short_description}
          </p>
          <a
            href={product.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-full text-center bg-gray-dark text-white so-body py-3"
          >
            View Product
          </a>
        </div>
      </div>
    </div>
  );
}
