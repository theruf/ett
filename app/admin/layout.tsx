import type { ReactNode } from "react";
import "../globals.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-dark antialiased">{children}</body>
    </html>
  );
}
