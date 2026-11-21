import Image from 'next/image'

import type { Project } from '@/lib/portfolio-data'

// Sem 'use client': servem à lista do servidor e à versão fixada do cliente.

export const pad2 = (n: number) => String(n).padStart(2, '0')

/** O mesmo `sizes` nas duas versões: a lista e a janela pedem a mesma imagem e aproveitam o cache. */
const IMAGE_SIZES = '(max-width: 1024px) 100vw, 50vw'

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
        >
          {tag}
        </li>
      ))}
    </ul>
  )
}

/** Captura do projeto numa moldura de navegador (três pontos e barra de endereço), na proporção de uma tela. */
export function BrowserFrame({
  project,
  className = '',
}: {
  project: Project
  className?: string
}) {
  return (
    <div
      className={`flex aspect-[16/10] flex-col overflow-hidden rounded-xl border border-border bg-background ${className}`}
    >
      <div
        aria-hidden="true"
        className="flex flex-none items-center gap-1.5 border-b border-border bg-foreground/[0.04] px-3 py-2"
      >
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="ml-2.5 h-2 max-w-60 flex-1 rounded-full bg-foreground/[0.07]" />
      </div>
      <div className="relative min-h-0 flex-1">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`Captura do projeto ${project.title}`}
          fill
          className="object-cover"
          sizes={IMAGE_SIZES}
        />
      </div>
    </div>
  )
}
