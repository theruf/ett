"use client";

import ProductDetail from "@/components/ProductDetail";
import { getProductById, getProductBySlug } from "@/lib/products";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const revalidate = 0;

function MiniProductWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = (window as any).Telegram?.WebApp;
    if (!tg || !tg.BackButton) return;

    const backButton = tg.BackButton;
    backButton.show();

    const handleBack = () => {
      router.back();
    };

    tg.onEvent("backButtonClicked", handleBack);

    return () => {
      tg.offEvent("backButtonClicked", handleBack);
      backButton.hide();
    };
  }, [router]);

  return <>{children}</>;
}

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MiniProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const resolved = await params;
      const { id } = resolved;
      const prod = /^\d+$/.test(id) ? await getProductBySlug(id) : await getProductById(id);
      setProduct(prod);
      setLoading(false);
    })();
  }, [params]);

  if (loading || !product) return null;

  return (
    <MiniProductWrapper>
      <div className="w-full px-5 sm:px-6 md:px-6 pb-4">
        <div className="max-w-screen-lg mx-auto">
          <ProductDetail product={product} />
        </div>
      </div>
    </MiniProductWrapper>
  );
}
