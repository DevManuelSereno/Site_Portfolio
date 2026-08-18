import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manuel Sereno — Desenvolvedor Front-End & UI/UX Designer',
  description:
    'Portfólio de Manuel Sereno, desenvolvedor front-end e designer UI/UX em Salvador, Bahia. Construindo interfaces modernas, acessíveis e centradas no usuário com React.',
  keywords: [
    'Manuel Sereno',
    'desenvolvedor front-end',
    'React',
    'UI/UX designer',
    'Salvador',
    'portfólio',
  ],
  authors: [{ name: 'Manuel Sereno' }],
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Manuel Sereno — Desenvolvedor Front-End & UI/UX Designer',
    description:
      'Construindo interfaces modernas, acessíveis e centradas no usuário com React.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d1117',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
