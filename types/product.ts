import type { Category } from "../lib/types";

export type { Category, Product } from "../lib/types";

// Category labels mapping
export const categoryLabels: Record<Category, string> = {
  clothing: "Одежда",
  accessories: "Аксессуары",
  gadgets: "Гаджеты",
  home: "Дом",
};

// Get category from slug
export const categoryFromSlug = (slug: string) => {
  if (slug in categoryLabels) {
    return slug as Category;
  }
  return null;
};
