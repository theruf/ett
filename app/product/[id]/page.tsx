import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import { getProductById } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const revalidate = 0;

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 py-6 md:py-10 lg:py-12">
      <div className="max-w-screen-2xl mx-auto">
        <ProductDetail product={product} />
      </div>
    </div>
  );
}
