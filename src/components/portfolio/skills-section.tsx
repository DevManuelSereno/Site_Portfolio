import { allSkills, type Skill } from '@/lib/portfolio-data'
import { SkillMarquee } from '@/components/ui/skill-marquee'
import { SkillDialog } from '@/components/ui/skill-dialog'

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <li className="group relative rounded-xl border border-border bg-background transition-colors duration-300 hover:border-primary/50">
      <SkillDialog skill={skill} />
    </li>
  )
}

export function SkillsSection() {
  return (
    <section
      id="habilidades"
      className="scroll-mt-24 border-y border-border bg-card/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-primary">02</span>
          <span className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Habilidades
          </span>
        </div>

        <h2 className="mt-12 max-w-2xl font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
          Ferramentas que uso para construir a web.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Um conjunto de linguagens, frameworks e ferramentas que uso no dia a
          dia para transformar ideias em interfaces — do protótipo no Figma ao
          código em produção. Sempre expandindo essa caixa de ferramentas.
        </p>

        {/* Esteira de logos — movimento sutil que representa o stack. */}
        <div className="mt-10 border-t border-border pt-8">
          <SkillMarquee />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allSkills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </ul>
      </div>
    </section>
  )
}
