import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const revalidate = 0;

export default async function HomePage() {
  const latestProducts = await getAllProducts();

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 pt-0 pb-4 md:pb-8 lg:pb-10">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={latestProducts} />
      </div>
    </div>
  );
}
