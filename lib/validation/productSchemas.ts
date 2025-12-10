import { z } from "zod";
import { Category } from "../products/types";

export const productInputSchema = z.object({
  title: z.string().min(1),
  category: z.custom<Category>(),
  price: z.number().optional(),
  currency: z.string().optional().default("USD"),
  shortDescription: z.string().optional(),
  longDescription: z.string().optional(),
  images: z.array(z.string().url()).min(1),
  externalUrl: z.string().url(),
  sourceLabel: z.string().optional(),
  isSponsored: z.boolean().optional(),
  isAffiliate: z.boolean().optional(),
});

export const productUpdateSchema = productInputSchema.partial();
