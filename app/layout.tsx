import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HALDRYX — Turnirlar",
  description:
    "HALDRYX turnir platformasi: yangiliklar, turnirlar, klublar va o‘yinchilar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={inter.variable}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <span className="brand-mini">HALDRYX</span>
            <span>© {new Date().getFullYear()} · Barcha huquqlar himoyalangan.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}