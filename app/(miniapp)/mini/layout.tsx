/**
 * Mini app layout (Telegram Mini Apps)
 * Does not affect the main web layout.
 */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
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

const MiniAppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [topInset, setTopInset] = useState(80);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = (window as any).Telegram?.WebApp;
    const safeTop = tg?.safeAreaInsets?.top;
    if (typeof safeTop === "number" && safeTop >= 0) {
      setTopInset(safeTop + 32);
    }
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div style={{ height: topInset }} />
      {children}
    </div>
  );
};

export default function MiniLayout({ children }: MiniLayoutProps) {
  const isTelegram = useMemo(
    () => typeof window !== "undefined" && Boolean(window.Telegram?.WebApp),
    []
  );

  useEffect(() => {
    document.body.classList.add("mini-app-hide-root");
    return () => {
      document.body.classList.remove("mini-app-hide-root");
    };
  }, []);

  useEffect(() => {
    if (!isTelegram) return;
    const webApp = window.Telegram!.WebApp;
    webApp.ready();
    webApp.expand?.();
    if (typeof webApp.disableVerticalSwipes === "function") {
      webApp.disableVerticalSwipes();
    }
    if (typeof webApp.requestFullscreen === "function") {
      webApp.requestFullscreen();
    }
    webApp.BackButton?.hide?.();
  }, [isTelegram]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isMini = window.location.pathname.startsWith("/mini");
    if (!isMini) return;
    const preventGesture = (e: Event) => {
      e.preventDefault();
    };
    window.addEventListener("gesturestart", preventGesture, { passive: false });
    return () => {
      window.removeEventListener("gesturestart", preventGesture);
    };
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <MiniAppShell>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </MiniAppShell>
      <style jsx global>{`
        body.mini-app-hide-root > div > header,
        body.mini-app-hide-root > div > footer {
          display: none;
        }
      `}</style>
    </>
  );
}
