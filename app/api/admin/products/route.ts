import { NextRequest, NextResponse } from "next/server";
import { productRepository } from "@/lib/products/productRepository";
import { productInputSchema } from "@/lib/validation/productSchemas";
import { Category } from "@/lib/products/types";
import { isAdminAuthenticated } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const search = searchParams.get("search") || undefined;

  const products = productRepository.getAll({
    category: category || undefined,
    search,
  });

  return NextResponse.json(products);
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

  const product = productRepository.create(parsed.data);
  return NextResponse.json(product, { status: 201 });
}
