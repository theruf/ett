import { supabase } from "./supabaseClient";
import type { Category, Product } from "./types";

export type ProductWithSlug = Product & { slug: string };

function mapProduct(row: any): Product {
  return {
    ...row,
    price:
      row.price === null || row.price === undefined
        ? null
        : Number(row.price),
  } as Product;
}

async function fetchAllWithSlugs(): Promise<ProductWithSlug[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to fetch products", error);
    return [];
  }

  return (data || []).map(mapProduct).map((row, idx) => ({ ...row, slug: `${idx + 1}` }));
}

export async function getAllProducts(): Promise<ProductWithSlug[]> {
  const all = await fetchAllWithSlugs();
  return [...all].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getProductsByCategory(category: Category): Promise<ProductWithSlug[]> {
  const all = await fetchAllWithSlugs();
  return all
    .filter((p) => p.category === category)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getProductById(id: string): Promise<ProductWithSlug | null> {
  const all = await fetchAllWithSlugs();
  return all.find((p) => p.id === id) || null;
}

export async function getProductBySlug(slug: string): Promise<ProductWithSlug | null> {
  const all = await fetchAllWithSlugs();
  return all.find((p) => p.slug === slug) || null;
}
