import type { Metadata } from "next";
import { Cairo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "W7 - Warshati 7",
  description: "Workshop management system foundation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans text-slate-900">{children}</body>
    </html>
  );
}
