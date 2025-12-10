import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { productInputSchema } from "@/lib/validation/productSchemas";
import { Category, Product } from "@/lib/types";
import { isAdminAuthenticated } from "@/lib/auth/session";

const mapProduct = (row: any): Product => ({
  ...row,
  price:
    row.price === null || row.price === undefined
      ? null
      : Number(row.price),
});

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const search = searchParams.get("search") || undefined;

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,short_description.ilike.%${search}%`
    );
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json((data || []).map(mapProduct));
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await req.json();
  const parsed = productInputSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;
  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select()
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: error?.message || "Failed to create" }, { status: 500 });
  }

  return NextResponse.json(mapProduct(data), { status: 201 });
}
