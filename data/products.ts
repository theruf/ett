import { Product } from "@/types/product";

/**
 * Mock product data for ÉTT Market
 *
 * HOW TO ADD A NEW PRODUCT:
 * 1. Copy one of the existing Product objects
 * 2. Change the id (must be unique)
 * 3. Fill in: title, category, shortDescription, images, externalUrl, sourceLabel
 * 4. Optional: add longDescription, isSponsored: true, isAffiliate: true
 * 5. Push the object into the products array
 */

export const products: Product[] = [
  // CLOTHING
  {
    id: "cl-001",
    title: "Minimal Tee",
    category: "clothing",
    price: 29,
    shortDescription: "Premium cotton basic with a clean cut and durable build.",
    longDescription:
      "Signature Uniqlo U tee by Christophe Lemaire: dense cotton, relaxed fit, no prints.",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
    externalUrl: "https://www.uniqlo.com/",
    sourceLabel: "Uniqlo",
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "cl-002",
    title: "Levi's 501",
    category: "clothing",
    price: 69,
    shortDescription: "Timeless straight denim since 1890 with a relaxed rise.",
    images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=800"],
    externalUrl: "https://www.levi.com/",
    sourceLabel: "Levi's",
    createdAt: new Date("2025-12-02"),
  },
  {
    id: "cl-003",
    title: "Wool Sweater",
    category: "clothing",
    price: 120,
    shortDescription: "Soft wool, relaxed silhouette, neutral tones. Scandinavian minimalism.",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"],
    externalUrl: "https://www.cosstores.com/",
    sourceLabel: "COS",
    isSponsored: true,
    createdAt: new Date("2025-12-03"),
  },

  // ACCESSORIES
  {
    id: "ac-001",
    title: "Slim Wallet",
    category: "accessories",
    price: 79,
    shortDescription: "Slim premium leather wallet. Fits up to 12 cards in a compact profile.",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=800"],
    externalUrl: "https://bellroy.com/",
    sourceLabel: "Bellroy",
    isAffiliate: true,
    createdAt: new Date("2025-12-04"),
  },
  {
    id: "ac-002",
    title: "Titanium Frame",
    category: "accessories",
    price: 420,
    shortDescription: "Ultra-light 1.9g titanium frame from Denmark. Screwless, minimal, resilient.",
    images: ["https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800"],
    externalUrl: "https://www.lindberg.com/",
    sourceLabel: "Lindberg",
    createdAt: new Date("2025-12-05"),
  },
  {
    id: "ac-003",
    title: "Kanken Backpack",
    category: "accessories",
    price: 110,
    shortDescription: "Iconic Swedish backpack. Water-resistant fabric and ergonomic straps.",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
    externalUrl: "https://www.fjallraven.com/",
    sourceLabel: "Fjällräven",
    createdAt: new Date("2025-12-06"),
  },

  // GADGETS
  {
    id: "gd-001",
    title: "Keychron K3",
    category: "gadgets",
    price: 89,
    shortDescription: "Low-profile wireless 75% board with hot-swap mechanical switches.",
    images: ["https://images.unsplash.com/photo-1595225476474-87563907a212?w=800"],
    externalUrl: "https://www.keychron.com/",
    sourceLabel: "Keychron",
    createdAt: new Date("2025-12-07"),
  },
  {
    id: "gd-002",
    title: "Sony WH-1000XM5",
    category: "gadgets",
    price: 399,
    shortDescription: "Class-leading noise canceling, 30h battery life, balanced sound.",
    images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800"],
    externalUrl: "https://www.sony.ru/",
    sourceLabel: "Sony",
    isSponsored: true,
    createdAt: new Date("2025-12-08"),
  },
  {
    id: "gd-003",
    title: "Kindle Paperwhite",
    category: "gadgets",
    price: 149,
    shortDescription: "6.8\" E-ink, waterproof, weeks of battery. Built for immersive reading.",
    images: ["https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=800"],
    externalUrl: "https://www.amazon.com/kindle",
    sourceLabel: "Amazon",
    createdAt: new Date("2025-12-09"),
  },

  // APPS
  {
    id: "ap-001",
    title: "Things 3",
    category: "apps",
    price: 59,
    shortDescription: "Elegant GTD task manager for macOS/iOS with a minimal, fast UI.",
    images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"],
    externalUrl: "https://apps.apple.com/app/things-3/id904237743",
    sourceLabel: "App Store",
    createdAt: new Date("2025-12-01"),
  },
  {
    id: "ap-002",
    title: "Notion Workspace",
    category: "apps",
    price: 0,
    shortDescription: "Flexible workspace for notes, databases, and projects in one place.",
    images: ["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800"],
    externalUrl: "https://www.notion.so/",
    sourceLabel: "Notion",
    isAffiliate: true,
    createdAt: new Date("2025-12-02"),
  },
  {
    id: "ap-003",
    title: "Bear App",
    category: "apps",
    price: 20,
    shortDescription: "Fast Markdown editor for focused writing without distractions.",
    images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800"],
    externalUrl: "https://bear.app/",
    sourceLabel: "Bear",
    createdAt: new Date("2025-12-03"),
  },

];

/**
 * Get all products
 */
export const getAllProducts = (): Product[] => {
  return products;
};

/**
 * Get products by category
 */
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

/**
 * Get latest products (for the homepage)
 */
export const getLatestProducts = (limit: number = 6): Product[] => {
  return products
    .sort((a, b) => {
      const dateA = a.createdAt ? a.createdAt.getTime() : 0;
      const dateB = b.createdAt ? b.createdAt.getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, limit);
};

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
