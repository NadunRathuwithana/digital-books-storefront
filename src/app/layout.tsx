import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/Header";
import SideCart from "@/components/SideCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Books Store",
  description: "Discover and purchase digital books across various genres",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
          <SideCart />
          <footer className="border-t mt-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted-foreground">
              © {new Date().getFullYear()} Digital Books. All rights reserved.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
