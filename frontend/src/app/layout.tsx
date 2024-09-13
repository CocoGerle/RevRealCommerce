"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ProductContextProvider } from "@/components/utils/context";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProductContextProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Header />
          <div style={{ minHeight: "calc(100vh - 320.5px - 74px)" }}>
            {children}
          </div>
          <Footer />
        </body>
      </ProductContextProvider>
    </html>
  );
}
