import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sonder Supply — Everyday, Refined.",
  description:
    "Considered everyday clothing made with honest materials and practical silhouettes.",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2f0eb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
