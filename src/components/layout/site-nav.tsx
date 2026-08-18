'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Contato', href: '#contato' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'px-4 pt-4 sm:pt-5' : 'px-0 pt-0'
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between gap-4 py-2.5 pl-6 transition-all duration-300 ${
          scrolled || open
            ? 'max-w-4xl rounded-full border border-border bg-background/80 px-4 shadow-lg shadow-black/20 backdrop-blur-md'
            : 'max-w-6xl rounded-none border-b border-transparent bg-background/50 px-6 backdrop-blur-sm lg:px-8'
        }`}
      >
        <a
          href="#inicio"
          className="font-mono text-sm tracking-tight text-foreground"
        >
          <span className="text-primary">{'{'}</span> MS{' '}
          <span className="text-primary">{'}'}</span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contato"
          className="hidden rounded-full border border-primary/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          Vamos conversar
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-foreground md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-4xl rounded-3xl border border-border bg-background/90 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-6 py-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
