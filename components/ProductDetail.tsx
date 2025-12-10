"use client";

import Image from "next/image";
import { useState } from "react";
import { Product } from "@/lib/types";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [index, setIndex] = useState(0);
  const images = product.images;

  const prev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
      <div className="flex flex-col gap-4 order-2 lg:order-1">
        <div className="flex flex-col gap-1">
          <p className="so-body text-gray-text capitalize">{product.category}</p>
          <h1 className="so-heading text-gray-dark">{product.title}</h1>
          <p className="so-body text-gray-dark">
            {product.price !== null ? `$${product.price}` : ""}
          </p>
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

      <div className="flex flex-col gap-3 order-1 lg:order-2">
        <div className="relative w-full bg-gray-lightest overflow-hidden rounded-sm" style={{ aspectRatio: "1" }}>
          {images.length > 0 && (
            <Image
              src={images[index]}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          )}

          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
              <button
                className="bg-white/90 text-gray-dark px-2 py-1 so-meta"
                onClick={prev}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                className="bg-white/90 text-gray-dark px-2 py-1 so-meta"
                onClick={next}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img + i}
                className={`relative shrink-0 border ${
                  i === index ? "border-gray-dark" : "border-gray-light"
                }`}
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
    </div>
  );
}
