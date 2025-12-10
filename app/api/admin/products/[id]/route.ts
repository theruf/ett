import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { productUpdateSchema } from "@/lib/validation/productSchemas";
import { isAdminAuthenticated } from "@/lib/auth/session";
import { Product } from "@/lib/types";

type RouteContext = {
  params: Promise<Record<string, string | string[] | undefined>>;
};

const mapProduct = (row: any): Product => ({
  ...row,
  price:
    row.price === null || row.price === undefined
      ? null
      : Number(row.price),
});

async function resolveProductId(params: Promise<Record<string, string | string[] | undefined>>) {
  const resolvedParams = await params;
  const id = resolvedParams?.id;
  return Array.isArray(id) ? id[0] : id;
}

export async function GET(req: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const productId = await resolveProductId(params);
  if (!productId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { data, error } = await supabase.from("products").select("*").eq("id", productId).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(mapProduct(data));
}

export async function PUT(req: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = await resolveProductId(params);
  if (!productId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const json = await req.json();
  const parsed = productUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .update(parsed.data)
    .eq("id", productId)
    .select()
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(mapProduct(data));
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = await resolveProductId(params);
  if (!productId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
