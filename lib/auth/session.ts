import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const COOKIE_NAME = "urldrop_admin";

export async function setAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(req?: NextRequest): Promise<boolean> {
  if (req) {
    const cookie = req.cookies.get(COOKIE_NAME);
    return cookie?.value === "1";
  }
  const cookieStore = await cookies();
  const cookie = cookieStore.get(COOKIE_NAME);
  return cookie?.value === "1";
}
