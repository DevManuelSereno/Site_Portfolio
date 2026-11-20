import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { IntroController } from "@/components/intro/intro-controller";
import { IntroOverlay } from "@/components/intro/intro-overlay";
import { PageField } from "@/components/layout/page-field";
import { JsonLd } from "@/components/json-ld";
import { introGateScript } from "@/lib/motion/intro-gate";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

// As três vozes do DESIGN.md: Space Grotesk afirma (títulos), Inter explica
// (prosa), JetBrains Mono anota (label, número, tag, CTA). Substituem Geist e
// Geist Mono, que o design system não usa.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  // Sem metadataBase, as URLs de OG e canonical resolvem como relativas e
  // quebram fora do site.
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    // Espaço reservado para `languages` quando o i18n entrar (decisão 2).
  },
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "Manuel Sereno",
    "desenvolvedor front-end",
    "react",
    "next.js",
    "typescript",
    "ui/ux designer",
    "salvador bahia",
    "desenvolvedor web",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: "index, follow",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    // Corrigido no merge: apontava para manuelsereno.dev, domínio que o Manuel
    // não possui. Agora vem do site-config.
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Manuel Sereno Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@ManuelSereno",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0d1117",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.lang}
      // data-scroll-behavior: a 16 não sobrescreve mais scroll-behavior na
      // navegação, e o site é todo âncora com rolagem suave.
      data-scroll-behavior="smooth"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
      // O script do <head> põe `intro-on` antes da hidratação.
      suppressHydrationWarning
    >
      <head>
        {/* Síncrono e antes da primeira pintura: decide a abertura sem piscar. */}
        <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      </head>
      <body className="font-sans antialiased">
        {/* Primeiro filho: com o HTML em fluxo, o overlay chega antes do que ele cobre. */}
        <IntroOverlay />
        <PageField />
        <JsonLd />
        {children}
        <IntroController />
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  );
}
