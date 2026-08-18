import Image from 'next/image'

import { experience, education, type TimelineItem } from '@/lib/portfolio-data'

function Timeline({
  label,
  items,
}: {
  label: string
  items: TimelineItem[]
}) {
  return (
    <div>
      <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-primary">
        {label}
      </h3>
      <ol className="relative border-l border-border">
        {items.map((item) => (
          <li key={item.title} className="mb-8 pl-6 last:mb-0">
            <span className="absolute -left-[5px] mt-1.5 h-2.5 w-2.5 rounded-full border border-primary bg-background" />
            <p className="font-mono text-xs text-muted-foreground">
              {item.period}
            </p>
            <p className="mt-1 font-display text-lg font-medium text-foreground">
              {item.title}
            </p>
            <p className="text-sm text-muted-foreground">{item.place}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary">01</span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Sobre
        </span>
      </div>

      <div className="mt-12 grid gap-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          {/* Retrato. PLACEHOLDER — a foto atual (public/foto-site-portfolio.jpg)
              foi preservada mas não é exibida: é noturna, de celular, com fundo
              ocupado e temperatura quente que destoa da paleta azul-ardósia.
              Ao trocar pela definitiva, mude só o `src` e devolva o alt para
              "Manuel Sereno" — enquanto for placeholder a imagem é decorativa e
              não deve anunciar um retrato que não está ali. Considerar também
              alimentar a propriedade `image` do schema Person. */}
          <div className="mb-8 h-32 w-32 overflow-hidden rounded-xl border border-border bg-card">
            <Image
              src="/placeholder.svg"
              alt=""
              width={128}
              height={128}
              className="h-full w-full object-cover"
            />
          </div>

          <h2 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
            Apaixonado por tecnologia, movido por detalhes.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Encontrei na programação a oportunidade de transformar paixão em
              carreira. Curso o 8º semestre de Ciência da Computação, ampliando
              minha visão em TI e reforçando meu interesse em atuar como
              desenvolvedor.
            </p>
            <p>
              Atuo como desenvolvedor web na{' '}
              <span className="text-foreground">Praxis Empresa Júnior</span>,
              criando soluções com HTML5, CSS3, JavaScript ES6+ e ferramentas de
              design como Figma. Também trabalho com plataformas como HostGator,
              acumulando experiência em projetos modernos e escaláveis — e
              avançando nos meus estudos em React, SCSS, Node.js e SQL.
            </p>
            <p>
              Meu objetivo é consolidar minha carreira unindo base acadêmica,
              experiência prática e paixão por tecnologia para entregar soluções
              digitais de qualidade.
            </p>
          </div>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-1">
          <Timeline label="Experiência" items={experience} />
          <Timeline label="Formação" items={education} />
        </div>
      </div>
    </section>
  )
}
