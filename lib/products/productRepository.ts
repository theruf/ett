import { Product, Category } from "./types";
import { v4 as uuidv4 } from "uuid";
import { products as seedProducts } from "@/data/products";

// In-memory mock storage. Swap with a DB (e.g., Supabase) by replacing these methods.
const products: Product[] = seedProducts.map((p) => ({
  currency: "USD",
  ...p,
}));

export interface ProductFilters {
  category?: Category;
  search?: string;
}

export const productRepository = {
  getAll(filters?: ProductFilters): Product[] {
    let result = [...products];
    if (filters?.category) {
      result = result.filter((p) => p.category === filters.category);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q)
      );
    }
    return result;
  },

  getById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
  },

  create(input: Omit<Product, "id">): Product {
    const newProduct: Product = {
      id: uuidv4(),
      currency: "USD",
      ...input,
    };
    products.push(newProduct);
    return newProduct;
  },

  update(id: string, input: Partial<Omit<Product, "id">>): Product | undefined {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    products[index] = { ...products[index], ...input };
    return products[index];
  },

  delete(id: string): boolean {
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return false;
    products.splice(index, 1);
    return true;
  },
};

// NOTE: To plug in Supabase/DB later, replace productRepository methods with actual DB calls.
