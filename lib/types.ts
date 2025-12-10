// Supabase products table types
// SQL to create the table (run in Supabase SQL editor):
// ------------------------------------------------------------------
// create extension if not exists "pgcrypto";
// create table if not exists products (
//   id uuid primary key default gen_random_uuid(),
//   created_at timestamptz not null default now(),
//   title text not null,
//   category text not null check (category in ('clothing', 'accessories', 'gadgets', 'apps')),
//   price numeric,
//   currency text not null default 'USD',
//   short_description text,
//   long_description text,
//   images text[] not null default '{}',
//   external_url text not null,
//   source_label text,
//   is_sponsored boolean not null default false,
//   is_affiliate boolean not null default false
// );
// ------------------------------------------------------------------

export type Category = "clothing" | "accessories" | "gadgets" | "apps";

export interface Product {
  id: string;
  slug?: string;
  created_at: string;
  title: string;
  category: Category;
  price: number | null;
  currency: string;
  short_description: string | null;
  long_description?: string | null;
  images: string[];
  external_url: string;
  source_label: string | null;
  is_sponsored: boolean;
  is_affiliate: boolean;
}
