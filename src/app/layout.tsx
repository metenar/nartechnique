import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nartechnique.com'),
  title: "Nar Technique | Bay Area Handyman Services",
  description: "Expert TV mounting, appliance installation, and handyman services in San Mateo & the Bay Area.",
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Nar Technique",
  "image": "https://www.nartechnique.com/logo.svg",
  "url": "https://www.nartechnique.com",
  "telephone": "+16507409472",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "San Mateo",
    "addressRegion": "CA",
    "addressCountry": "US"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/nar-favicon.svg?v=6" type="image/svg+xml" />
        <link rel="shortcut icon" href="/nar-favicon.svg?v=6" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
