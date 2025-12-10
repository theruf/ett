import { NextRequest, NextResponse } from "next/server";
import { productRepository } from "@/lib/products/productRepository";
import { productInputSchema, productUpdateSchema } from "@/lib/validation/productSchemas";
import { isAdminAuthenticated } from "@/lib/auth/session";

type RouteContext = {
  params: Promise<Record<string, string | string[] | undefined>>;
};

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
  const product = productRepository.getById(productId);
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
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

  const updated = productRepository.update(productId, parsed.data);
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  if (!(await isAdminAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const productId = await resolveProductId(params);
  if (!productId) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

  const ok = productRepository.delete(productId);
  if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
