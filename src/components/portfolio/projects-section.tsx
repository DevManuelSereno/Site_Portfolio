import { projects, type Project } from '@/lib/portfolio-data'
import { ProjectsMotion } from '@/components/portfolio/projects-motion'
import { BrowserFrame, ProjectTags, pad2 } from '@/components/portfolio/project-parts'

function ProjectItem({
  project,
  index,
  total,
}: {
  project: Project
  index: number
  total: number
}) {
  return (
    <li>
      <article className="grid gap-5 lg:grid-cols-2 lg:items-center lg:gap-12">
        <BrowserFrame
          project={project}
          className={index % 2 === 1 ? 'lg:order-2' : ''}
        />
        <div className="grid gap-3.5">
          <div className="flex gap-3 font-mono text-xs uppercase tracking-widest">
            <span className="text-primary">
              {pad2(index + 1)} / {pad2(total)}
            </span>
            <span className="text-muted-foreground">{project.year}</span>
          </div>
          <h3 className="font-display text-3xl font-bold tracking-tight text-balance">
            {project.title}
          </h3>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <ProjectTags tags={project.tags} />
        </div>
      </article>
    </li>
  )
}

// A lista é o conteúdo servido (SEO, sem JS, reduced-motion); a versão fixada só a esconde via `data-mode`.
export function ProjectsSection() {
  return (
    <section
      id="projetos"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div
        data-projects-stage
        className="group/stage">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-primary">03</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Projetos
          </span>
        </div>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
            Seleção de trabalhos recentes.
          </h2>
          <span className="hidden font-mono text-xs text-muted-foreground group-data-[mode=editor]/stage:inline">
            {'// um arquivo por projeto'}
          </span>
        </div>

        <ol className="mt-14 grid gap-14 group-data-[mode]/stage:hidden">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              total={projects.length}
            />
          ))}
        </ol>
        <ProjectsMotion />
      </div>
    </section>
  )
}
