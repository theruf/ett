// Product category types
export type Category =
  | "clothing"
  | "accessories"
  | "gadgets"
  | "apps";

// Category labels mapping
export const categoryLabels: Record<Category, string> = {
  clothing: "Clothing",
  accessories: "Accessories",
  gadgets: "Gadgets",
  apps: "Apps",
};

// Get category from slug
export const categoryFromSlug = (slug: string): Category | null => {
  if (slug in categoryLabels) {
    return slug as Category;
  }
  return null;
};

// Product model
export interface Product {
  id: string;
  title: string;
  category: Category;
  price: number;
  shortDescription: string;
  longDescription?: string;
  images: string[];
  externalUrl: string;
  sourceLabel: string;
  isSponsored?: boolean;
  isAffiliate?: boolean;
  createdAt?: Date;
}
