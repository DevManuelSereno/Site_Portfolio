import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Manuel Sereno - Desenvolvedor Front-End e UI/UX Designer",
  description: "Desenvolvedor Front-End especializado em React, TypeScript e Next.js. 2 anos de experiência criando soluções digitais modernas e escaláveis. Localizado em Salvador, Bahia.",
  keywords: ["desenvolvedor front-end", "react", "typescript", "next.js", "ui/ux designer", "salvador bahia", "desenvolvedor web"],
  authors: [{ name: "Manuel Sereno" }],
  creator: "Manuel Sereno",
  publisher: "Manuel Sereno",
  robots: "index, follow",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/vercel.svg',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://manuelsereno.dev",
    title: "Manuel Sereno - Desenvolvedor Front-End e UI/UX Designer",
    description: "Desenvolvedor Front-End especializado em React, TypeScript e Next.js. 2 anos de experiência criando soluções digitais modernas e escaláveis.",
    siteName: "Manuel Sereno Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manuel Sereno - Desenvolvedor Front-End e UI/UX Designer",
    description: "Desenvolvedor Front-End especializado em React, TypeScript e Next.js. 2 anos de experiência criando soluções digitais modernas e escaláveis.",
    creator: "@ManuelSereno",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
