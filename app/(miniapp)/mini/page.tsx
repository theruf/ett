import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const revalidate = 0;

export default async function MiniPage() {
  const products = await getAllProducts();

  return (
    <div className="w-full px-5 sm:px-6 md:px-6 pb-4">
      <div className="max-w-screen-lg mx-auto">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
