import { ArrowUp } from 'lucide-react'
import { contactInfo } from '@/lib/portfolio-data'

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-12 lg:px-8">
      <div className="flex flex-col gap-8 border-t border-border pt-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            Manuel Sereno
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Construindo soluções digitais modernas e personalizadas.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {contactInfo.location}
          </p>
        </div>

        <a
          href="#inicio"
          className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary sm:self-auto"
        >
          Voltar ao topo
          <ArrowUp
            size={14}
            className="transition-transform group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="mt-10 flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Manuel Sereno. Todos os direitos reservados.</p>
        <p className="font-mono">Desenhado & desenvolvido por Manuel Sereno</p>
      </div>
    </footer>
  )
}
