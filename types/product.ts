import type { Category } from "../lib/types";

export type { Category, Product } from "../lib/types";

// Category labels mapping
export const categoryLabels = {
  clothing: "Clothing",
  accessories: "Accessories",
  gadgets: "Gadgets",
  apps: "Apps",
} as const;

// Get category from slug
export const categoryFromSlug = (slug: string) => {
  if (slug in categoryLabels) {
    return slug as Category;
  }
  return null;
};
