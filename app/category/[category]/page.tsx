import { notFound } from "next/navigation";
import ProductGrid from "@/components/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { categoryFromSlug, categoryLabels, Category } from "@/types/product";

export const revalidate = 0;
export const dynamic = "force-dynamic";

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
    "home",
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
      title: "Категория не найдена — ÉTT Market",
    };
  }

  const categoryLabel = categoryLabels[category];

  return {
    title: `${categoryLabel} — ÉTT Market`,
    description: `Подборка товаров категории: ${categoryLabel}.`,
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
    <div className="w-full px-5 sm:px-8 md:px-10 pt-0 pb-4 md:pb-8 lg:pb-10">
      <div className="max-w-screen-2xl mx-auto">
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
