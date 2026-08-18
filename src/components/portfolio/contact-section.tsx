import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { contactInfo } from '@/lib/portfolio-data'
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons'
import { ContactForm } from '@/components/portfolio/contact-form'

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

/**
 * Composição empilhada, não a grade assimétrica das outras seções.
 *
 * A decisão 13 do PLAN.md manda conviver o formulário do Resend com os canais
 * do redesign. Numa grade de duas colunas o formulário deixaria a coluna larga
 * muito mais alta que a lista de canais — exatamente o que o DESIGN.md proíbe
 * ("Don't montar grade assimétrica quando uma das colunas for muito mais alta
 * que a outra — use a composição empilhada").
 *
 * O componente segue sendo servidor: só o formulário é cliente, então toda a
 * copy continua no HTML estático, onde crawler e LLM conseguem lê-la.
 */
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

        <h2 className="mt-12 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-5xl">
          Gostou do meu trabalho? Bora trocar uma ideia.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Estou aberto a oportunidades, freelas e conversas sobre tecnologia e
          design. Preencha o formulário abaixo, ou escolha o canal que preferir
          — respondo o mais breve possível.
        </p>

        <div className="mt-14 border-t border-border pt-12">
          <ContactForm />
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Ou me encontre em
          </p>

          <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={
                      channel.href.startsWith('mailto') ? undefined : '_blank'
                    }
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-border py-5 transition-colors hover:text-primary"
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
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
