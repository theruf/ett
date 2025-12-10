import { supabase } from "./supabaseClient";
import type { Category, Product } from "./types";

function mapProduct(row: any): Product {
  return {
    ...row,
    price:
      row.price === null || row.price === undefined
        ? null
        : Number(row.price),
  } as Product;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products", error);
    return [];
  }

  return (data || []).map(mapProduct);
}

export async function getProductsByCategory(category: Category): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch products by category", error);
    return [];
  }

  return (data || []).map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch product by id", error);
    return null;
  }

  return data ? mapProduct(data) : null;
}
