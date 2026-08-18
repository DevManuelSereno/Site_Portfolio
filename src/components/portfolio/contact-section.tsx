import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { contactInfo } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons'

const channels = [
  {
    icon: Mail,
    label: 'Email',
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: contactInfo.phone,
    href: contactInfo.phoneHref,
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: contactInfo.linkedinHandle,
    href: contactInfo.linkedin,
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: contactInfo.githubHandle,
    href: contactInfo.github,
  },
]

export function ContactSection() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 border-t border-border bg-card/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-primary">05</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Contato
          </span>
        </div>

        <div className="mt-12 grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Gostou do meu trabalho? Bora trocar uma ideia.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground">
              Estou aberto a oportunidades, freelas e conversas sobre tecnologia
              e design. Escolha o canal que preferir — respondo o mais breve
              possível.
            </p>

            <a
              href={`mailto:${contactInfo.email}`}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-mono text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Enviar um email
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-primary"
                >
                  <span className="flex items-center gap-4">
                    <Icon
                      size={18}
                      className="text-muted-foreground transition-colors group-hover:text-primary"
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {channel.label}
                    </span>
                  </span>
                  <span className="flex items-center gap-2 text-sm text-foreground transition-colors group-hover:text-primary">
                    {channel.value}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
