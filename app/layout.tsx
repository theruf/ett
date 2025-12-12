import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "ÉTT Market — Каталог избранных товаров",
  description:
    "Curated пространство предметов без избыточного шума. Визуальная среда сведена к состоянию, в котором объект остается наедине с вами.",
  keywords: ["étt market", "каталог", "товары", "гаджеты", "дом", "одежда", "аксессуары"],
  openGraph: {
    title: "ÉTT Market — Каталог избранных товаров",
    description:
      "Curated пространство предметов без избыточного шума. Визуальная среда сведена к состоянию, в котором объект остается наедине с вами.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="bg-white antialiased">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
