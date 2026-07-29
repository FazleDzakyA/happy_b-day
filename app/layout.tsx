import type { Metadata, Viewport } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Luthfia Deanis • A Romantic Storybook & Celebration",
  description: "An interactive romantic storybook and birthday celebration created with love by Haydar for Luthfia Deanis. 10 October 2026.",
  authors: [{ name: "Haydar" }],
  keywords: ["Luthfia Deanis", "Haydar", "Birthday Storybook", "Romantic Interactive Website", "Love Confession", "10 October 2026"],
  openGraph: {
    title: "Luthfia Deanis • A Romantic Storybook",
    description: "Every beautiful story begins with a single page...",
    url: "https://luthfiadeanis.vercel.app",
    siteName: "Luthfia Deanis Storybook",
    images: [
      {
        url: "/photos/photo1.jpg",
        width: 1200,
        height: 630,
        alt: "Luthfia Deanis Storybook",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luthfia Deanis • A Romantic Storybook",
    description: "Every beautiful story begins with a single page...",
    images: ["/photos/photo1.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F8",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} dark`}>
      <body className="antialiased min-h-screen bg-[#0F0B15] text-[#FFF0F5] overflow-x-hidden selection:bg-[#FFD6E8] selection:text-[#3D2B33]">
        {children}
      </body>
    </html>
  );
}
