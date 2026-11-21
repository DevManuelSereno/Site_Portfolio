import Image from 'next/image'
import { projects, type Project } from '@/lib/portfolio-data'
import { ProjectsMotion } from '@/components/portfolio/projects-motion'

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

function ProjectRow({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  const flip = index % 2 === 1
  return (
    <article
      data-project
      className="grid items-center gap-8 border-t border-border py-12 first:border-t-0 first:pt-0 lg:min-h-[80svh] lg:grid-cols-2 lg:gap-16 lg:py-16"
    >
      <div
        data-project-media
        data-glow
        className={`relative aspect-square overflow-hidden rounded-xl border border-border bg-card ${
          flip ? 'lg:order-2' : ''
        }`}
      >
        <Image
          src={project.image || '/placeholder.svg'}
          alt={`Capa do projeto ${project.title}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={index === 0}
        />
      </div>
      <div data-project-text className="flex flex-col justify-center">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
          <span className="text-primary">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="text-muted-foreground">{project.year}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
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

export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-primary">03</span>
        <span className="h-px flex-1 bg-border" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Projetos
        </span>
      </div>

      <h2 className="mt-12 max-w-2xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
        Seleção de trabalhos recentes.
      </h2>

      <div className="mt-14">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
      <ProjectsMotion />
    </section>
  )
}
