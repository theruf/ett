"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category, categoryLabels } from "@/types/product";

const categories: (Category | "all")[] = [
  "clothing",
  "accessories",
  "gadgets",
  "apps",
  "all",
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="w-full px-5 sm:px-8 md:px-10">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="so-nav text-gray-dark">ÉTT Market</h1>
          </Link>

          {/* Inline nav */}
          <nav className="flex flex-wrap items-center justify-end gap-4 md:gap-6">
            {categories.map((category) => {
              const href =
                category === "all" ? "/" : `/category/${category}`;
              const isActive =
                category === "all"
                  ? pathname === "/"
                  : pathname === href;
              return (
                <Link
                  key={category}
                  href={href}
                  className={`so-nav transition-colors ${
                    isActive
                      ? "text-gray-dark"
                      : "text-gray-text hover:text-gray-dark"
                  }`}
                >
                  {category === "all" ? "All" : categoryLabels[category]}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
