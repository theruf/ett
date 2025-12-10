import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/data/products";
import { categoryFromSlug, categoryLabels, Category } from "@/types/product";
import ProductGrid from "@/components/ProductGrid";

/**
 * Dynamic category page
 *
 * URL: /category/[category]
 * Examples: /category/clothing, /category/gadgets, /category/apps
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

  const products = getProductsByCategory(category);
  const categoryLabel = categoryLabels[category];

  return (
    <div className="w-full px-5 sm:px-8 md:px-10 py-8 md:py-12 lg:py-16">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
