import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProductById, getProductBySlug } from "@/lib/products";

export const revalidate = 0;
export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = /^\d+$/.test(id) ? await getProductBySlug(id) : await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 pt-0 pb-4 md:pb-8 lg:pb-10">
      <div className="max-w-screen-2xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
