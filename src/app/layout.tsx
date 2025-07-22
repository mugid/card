import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Funnel_Display } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Bek Slambek | Card",
  description: "Software engineer and  designer based in Almaty, Kazakhstan.",
  openGraph: {
    title: "Bek Slambek | Card",
    description: "Software engineer and designer based in Almaty, Kazakhstan.",
    url: "https://sbek.tech",
    siteName: "Bek Slambek",
    images: [
      {
        url: "https://sbek.tech/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Bek Slambek's Open Graph Image",
      },
    ],
    locale: "en_US",
    type: "website",
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
        className={`${funnelDisplay.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
