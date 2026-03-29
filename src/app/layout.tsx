import type { Metadata } from "next";
import { Bebas_Neue, Libre_Baskerville, Outfit } from "next/font/google";
import "./globals.css";
import { business } from "@/data/site";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-accent-serif",
});

const siteUrl = "https://smokinbuns.com";

export const viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} · ${business.tagline} · Belleville, MI`,
    template: `%s · ${business.name}`,
  },
  description: business.description,
  openGraph: {
    title: `${business.name} — Chargrilled Burgers & Bowls in Belleville`,
    description: business.description,
    url: siteUrl,
    siteName: business.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} · Belleville, MI`,
    description: business.description,
  },
  keywords: [
    "Smokin Buns",
    "chargrilled burgers",
    "Belleville MI restaurant",
    "beef tallow fries",
    "protein bowls",
    "chicken wings",
    "fast casual",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${outfit.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">
        {children}
      </body>
    </html>
  );
}
