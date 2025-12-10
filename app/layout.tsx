import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ÉTT Market — Curated Collection",
  description:
    "ÉTT Market is a curated showcase of interesting products, gadgets, apps, and services. We don't sell anything — we just show you the best and send you to the seller.",
  keywords: [
    "curated",
    "showcase",
    "products",
    "gadgets",
    "apps",
    "books",
    "music",
    "movies",
    "services",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
