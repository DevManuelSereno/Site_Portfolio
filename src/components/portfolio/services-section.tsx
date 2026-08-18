import { Code, Palette, Layout, Languages, type LucideIcon } from 'lucide-react'
import { services, type Service } from '@/lib/portfolio-data'

const iconMap: Record<Service['icon'], LucideIcon> = {
  code: Code,
  palette: Palette,
  layout: Layout,
  languages: Languages,
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon]
  return (
    <article className="group relative flex flex-col rounded-2xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background text-primary transition-colors group-hover:border-primary/50">
          <Icon size={22} />
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground">
        {service.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {service.deliverables.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary">03</span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Serviços
        </span>
      </div>

      <h2 className="mt-12 max-w-2xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
        Como posso ajudar no seu projeto.
      </h2>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
        Uno design e código para entregar produtos digitais ponta a ponta — do
        primeiro rascunho no Figma até o deploy em produção. Precisando de algo
        específico?{' '}
        <a
          href="#contato"
          className="text-primary underline-offset-4 hover:underline"
        >
          Vamos conversar
        </a>
        .
      </p>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}
