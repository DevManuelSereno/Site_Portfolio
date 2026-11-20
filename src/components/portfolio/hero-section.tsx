import { ArrowUpRight, Mail } from 'lucide-react'
import { contactInfo } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/social-icons'
import { HeroNetwork } from './hero-network'
import { HeroVisual } from './hero-visual'

const socials = [
  { icon: GithubIcon, href: contactInfo.github, label: 'GitHub' },
  { icon: LinkedinIcon, href: contactInfo.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'Email' },
  { icon: InstagramIcon, href: contactInfo.instagram, label: 'Instagram' },
]

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <HeroNetwork />
      <section
        id="inicio"
        className="relative mx-auto grid min-h-svh max-w-6xl content-center gap-14 px-6 pb-16 pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10 lg:px-8"
      >
        <div className="flex flex-col justify-center">
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
            Disponível para novos projetos
          </p>

          <p className="mb-4 font-mono text-sm text-primary">
            const desenvolvedor = {'{'}
          </p>

          <h1 className="font-display text-6xl font-bold leading-[0.95] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            Manuel
            <br />
            <span className="text-muted-foreground">Sereno</span>
          </h1>

          <p className="mt-4 font-mono text-sm text-primary">{'}'}</p>

          <h2 className="mt-8 max-w-2xl font-display text-xl font-medium text-foreground text-balance sm:text-2xl">
            Desenvolvedor Front-End{' '}
            <span className="text-muted-foreground">&</span> UI/UX Designer
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Dois anos transformando ideias em interfaces rápidas, acessíveis e
            centradas no usuário. Foco em React, atenção ao detalhe e paixão por
            construir produtos digitais bem feitos.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Vamos conversar
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-sm text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              Ver projetos
            </a>
          </div>

          <div className="mt-14 flex items-center gap-5">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  <Icon size={20} />
                </a>
              )
            })}
          </div>
        </div>
        <HeroVisual />
      </section>
    </div>
  )
}
