"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductWithSlug } from "@/lib/products";

const isVideo = (src: string) => /\.mp4(\?|$)/i.test(src);
const formatPrice = (price: number) => {
  // Разделяем тысячи пробелами, отображая так же, как вводит пользователь
  return new Intl.NumberFormat("en-US").format(price).replace(/,/g, " ");
};

interface ProductCardProps {
  product: ProductWithSlug;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [hoverSwap, setHoverSwap] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
      setHoverSwap(true);
    }
  }, []);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white overflow-hidden transition-opacity hover:opacity-70 animate-fade-up"
    >
      {/* Product image - portrait 3:4 ratio */}
      <div
        className="relative w-full bg-gray-lightest overflow-hidden mb-3"
        style={{ aspectRatio: "1 / 1" }}
      >
        {product.images.length > 0 && (
          isVideo(product.images[0]) ? (
            <video
              src={product.images[0]}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className={`object-cover transition-opacity duration-300 ease-in-out ${
                hoverSwap && product.images.length > 1 && !isVideo(product.images[1]) ? "hover:opacity-0" : ""
              }`}
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
          )
        )}
        {hoverSwap &&
          product.images.length > 1 &&
          !isVideo(product.images[0]) &&
          !isVideo(product.images[1]) && (
            <Image
              src={product.images[1]}
              alt={product.title}
              fill
              className="object-cover opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
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
          <p className="so-body text-gray-text shrink-0">
            {product.price !== null
              ? `${formatPrice(product.price)}${product.currency ? ` ${product.currency}` : ""}`
              : ""}
          </p>
        </div>
        <p
          className={`so-meta text-gray-text ${
            product.is_sponsored ? "" : "invisible"
          }`}
        >
          Реклама
        </p>
      </div>
    </Link>
  );
}
