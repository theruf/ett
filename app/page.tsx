import { getLatestProducts } from "@/data/products";
import ProductGrid from "@/components/ProductGrid";

/**
 * ÉTT Market Homepage (still-object store/grid style)
 *
 * Structure:
 * - Centered tagline
 * - Products grid (6 columns on desktop, 2 on mobile)
 * - White background
 */

export default function HomePage() {
  const latestProducts = getLatestProducts(24);

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 py-8 md:py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={latestProducts} />
      </div>
    </div>
  );
}
