/**
 * Mini app layout (Telegram Mini Apps)
 * Does not affect the main web layout.
 */
"use client";

import { useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface MiniLayoutProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    Telegram?: any;
  }
}

export default function MiniLayout({ children }: MiniLayoutProps) {
  const isTelegram = useMemo(
    () => typeof window !== "undefined" && Boolean(window.Telegram?.WebApp),
    []
  );

  useEffect(() => {
    if (!isTelegram) return;
    const webApp = window.Telegram!.WebApp;
    webApp.ready();
    webApp.expand?.();
    webApp.requestFullscreen?.();
    webApp.disableVerticalSwipes?.();
  }, [isTelegram]);

  return (
    <div
      className="min-h-screen flex flex-col bg-white antialiased"
      style={{
        paddingTop: isTelegram ? "env(safe-area-inset-top, 20px)" : undefined,
      }}
    >
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
