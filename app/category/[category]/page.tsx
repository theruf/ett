import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { categoryFromSlug, categoryLabels, Category } from "@/types/product";

/**
 * Dynamic category page
 *
 * URL: /category/[category]
 * Examples: /category/clothing, /category/gadgets
 */

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categories: Category[] = [
    "clothing",
    "accessories",
    "gadgets",
    "apps",
  ];

  return categories.map((category) => ({
    category,
  }));
}

export const revalidate = 0;

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categoryFromSlug(categorySlug);

  if (!category) {
    return {
      title: "Category Not Found — ÉTT Market",
    };
  }

  const categoryLabel = categoryLabels[category];

  return {
    title: `${categoryLabel} — ÉTT Market`,
    description: `Curated collection of ${categoryLabel.toLowerCase()}. Only the best products and services.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = categoryFromSlug(categorySlug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category);
  const categoryLabel = categoryLabels[category];

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 py-4 md:py-8 lg:py-10">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
