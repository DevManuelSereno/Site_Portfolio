import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '@/lib/portfolio-data'

function Tags({ tags }: { tags: string[] }) {
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

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`Capa do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-primary">
          <span>Destaque</span>
          <span className="text-muted-foreground">/ {project.year}</span>
        </div>
        <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-balance">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-6">
          <Tags tags={project.tags} />
        </div>
      </div>
    </article>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`Capa do projeto ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{project.year}</span>
          </div>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          size={20}
          className="mt-1 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {project.description}
      </p>
      <div className="mt-4">
        <Tags tags={project.tags} />
      </div>
    </article>
  )
}

export function ProjectsSection() {
  const [featured, ...rest] = projects

  return (
    <section
      id="projetos"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary">04</span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Projetos
        </span>
      </div>

      <h2 className="mt-12 max-w-2xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
        Seleção de trabalhos recentes.
      </h2>

      <div className="mt-14">
        <FeaturedProject project={featured} />
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-16 border-t border-border pt-16 sm:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
