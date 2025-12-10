export type Category = "clothing" | "accessories" | "gadgets" | "apps";

export interface Product {
  id: string;
  title: string;
  category: Category;
  price?: number;
  currency?: string;
  shortDescription?: string;
  longDescription?: string;
  images: string[];
  externalUrl: string;
  sourceLabel?: string;
  isSponsored?: boolean;
  isAffiliate?: boolean;
}
