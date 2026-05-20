import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nar Technique | Professional Handyman & Installation Services in San Mateo",
  description: "Reliable, clean, and detail-focused handyman services in the Bay Area. Specializing in TV mounting, appliance installation, lighting, and home repairs.",
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
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
