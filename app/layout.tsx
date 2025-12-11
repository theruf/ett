import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ÉTT Market — Каталог избранных товаров",
  description:
    "ÉTT Market — это избранные товары с российских маркетплейсов: Ozon, Wildberries, Яндекс Маркет и другие. Мы не продаём — только показываем лучшее и отправляем к продавцу.",
  keywords: ["étt market", "каталог", "товары", "гаджеты", "дом", "одежда", "аксессуары"],
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
      </body>
    </html>
  );
}
