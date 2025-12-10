import { z } from "zod";
import { Category } from "../types";

export const productInputSchema = z.object({
  title: z.string().min(1),
  category: z.custom<Category>(),
  price: z.number().nullable().optional(),
  currency: z.string().optional().default("USD"),
  short_description: z.string().nullable().optional(),
  long_description: z.string().nullable().optional(),
  images: z.array(z.string().url()).min(1),
  external_url: z.string().url(),
  source_label: z.string().nullable().optional(),
  is_sponsored: z.boolean().optional().default(false),
  is_affiliate: z.boolean().optional().default(false),
});

export const productUpdateSchema = productInputSchema.partial();
