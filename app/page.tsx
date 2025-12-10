import ProductGrid from "@/components/ProductGrid";
import { getAllProducts } from "@/lib/products";

export const revalidate = 0;

/**
 * ÉTT Market Homepage (still-object store/grid style)
 *
 * Structure:
 * - Centered tagline
 * - Products grid (6 columns on desktop, 2 on mobile)
 * - White background
 */

export default async function HomePage() {
  const latestProducts = await getAllProducts();

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 py-8 md:py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={latestProducts} />
      </div>
    </div>
  );
}
