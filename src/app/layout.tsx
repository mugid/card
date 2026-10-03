import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

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
    "Bek Slambek is a design engineer building Hireke and studying computer science at Nazarbayev University.",
  keywords: [
    "Bek Slambek",
    "design engineer",
    "Hireke",
    "portfolio",
    "Nazarbayev University",
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
      "A design engineer building Hireke and studying computer science at Nazarbayev University.",
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
      "A design engineer building Hireke and studying computer science at Nazarbayev University.",
    images: ["/opengraph-image"],
    creator: "@bekslambek",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
