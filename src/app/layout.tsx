import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EmilCar Ardenno | Concessionario Auto e Officina Meccanica",
  description:
    "EmilCar di Ardenno: concessionario veicoli d'occasione, officina meccanica, gommista, diagnosi computerizzata, cambi automatici e ganci traino. Oltre 30 anni di esperienza in Valtellina.",
  keywords: [
    "EmilCar",
    "Ardenno",
    "concessionario auto",
    "auto usate",
    "officina meccanica",
    "gommista",
    "Valtellina",
    "Sondrio",
    "diagnosi computerizzata",
    "cambi automatici",
  ],
  authors: [{ name: "EmilCar S.r.l." }],
  openGraph: {
    title: "EmilCar Ardenno | Concessionario Auto e Officina",
    description:
      "Oltre 30 anni di esperienza al servizio della tua auto in Valtellina. Vendita veicoli, officina meccanica, gommista e molto altro.",
    url: "https://www.emilcarsrl.com",
    siteName: "EmilCar Ardenno",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}