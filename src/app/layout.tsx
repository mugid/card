import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Funnel_Display } from "next/font/google";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bekslambek.com"),
  title: {
    default: "Bek Slambek | Design Engineer",
    template: "%s | Bek Slambek",
  },
  description:
    "Bek Slambek is a design engineer exploring AI capabilities, building product interfaces, hiring tools, games, and creative web experiments.",
  keywords: [
    "Bek Slambek",
    "design engineer",
    "frontend developer",
    "AI products",
    "portfolio",
    "Nazarbayev University",
    "Hireke",
  ],
  authors: [{ name: "Bek Slambek", url: "https://bekslambek.com" }],
  creator: "Bek Slambek",
  publisher: "Bek Slambek",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bek Slambek | Design Engineer",
    description:
      "Design engineer exploring AI capabilities through product interfaces, hiring workflows, games, and creative web experiments.",
    url: "https://bekslambek.com",
    siteName: "Bek Slambek",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Bek Slambek - Design Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bek Slambek | Design Engineer",
    description:
      "Design engineer exploring AI capabilities through product interfaces and creative web experiments.",
    images: ["/opengraph-image"],
    creator: "@sbek22_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${funnelDisplay.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
