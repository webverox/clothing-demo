import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: {
    default: "Sonder Supply | Demo by Webverox",
    template: "%s | Sonder Supply",
  },

  description:
    "Considered everyday clothing made with honest materials, refined details, and practical silhouettes.",

  keywords: [
    "Sonder Supply",
    "everyday clothing",
    "minimal clothing",
    "contemporary fashion",
    "essential clothing",
    "refined basics",
  ],

  authors: [{ name: "Sonder Supply" }],
  creator: "Sonder Supply",
  publisher: "Sonder Supply",

  applicationName: "Sonder Supply",

  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
    ],
    apple: "/icon.png",
  },

  openGraph: {
    title: "Sonder Supply — Considered Everyday Clothing",
    description:
      "Considered everyday clothing made with honest materials, refined details, and practical silhouettes.",
    siteName: "Sonder Supply",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Sonder Supply — Considered Everyday Clothing",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sonder Supply — Considered Everyday Clothing",
    description:
      "Considered everyday clothing made with honest materials, refined details, and practical silhouettes.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
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
        <SmoothScroll>
          {children}
          {process.env.NODE_ENV === "production" && <Analytics />}
        </SmoothScroll>
      </body>
    </html>
  );
}
