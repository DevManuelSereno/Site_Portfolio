'use client'

import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { projects, type Project } from '@/lib/portfolio-data'
import {
  activeProjectIndex,
  compensatedScroll,
  pinDistance,
  pinnedQueries,
  projectScrollTarget,
  restoredPinnedScroll,
  tabIndexForKey,
  type PinnedScrollRecord,
} from '@/lib/motion/project-steps'
import { attachScrollSync, jumpTo, smoothScrollTo } from '@/lib/motion/smooth-scroll'
import { BrowserFrame, ProjectTags, pad2 } from '@/components/portfolio/project-parts'

const TOTAL = projects.length
const QUERIES = pinnedQueries()
// Centro do palco no centro da área abaixo do cabeçalho fixo do site (cerca de 80 px).
const PIN_START = 'center center+=40'
/** Colunas do README e do preview: os fios fixos e os painéis usam a mesma grade. */
const PANES = 'grid grid-cols-[minmax(300px,0.8fr)_minmax(0,1.2fr)]'
const FADE = 'transition-[opacity,transform] ease-out motion-reduce:transition-none'
const SCROLL_KEY = 'ms:projects-scroll'

/** Alvo da âncora com que a página abriu, se estiver fora da seção (ex.: /#contato). */
function hashTargetOutside(section: HTMLElement): HTMLElement | null {
  const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
  if (nav?.type !== 'navigate' || location.hash.length < 2) return null
  const target = document.getElementById(decodeURIComponent(location.hash.slice(1)))
  return target && !section.contains(target) ? target : null
}

/** Posição que a âncora nativa daria ao elemento (respeita o scroll-mt). */
function anchorY(target: HTMLElement) {
  const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
  return target.getBoundingClientRect().top + window.scrollY - margin
}

const USER_INPUTS = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

function readScrollRecord(): PinnedScrollRecord | null {
  try {
    const raw = sessionStorage.getItem(SCROLL_KEY)
    sessionStorage.removeItem(SCROLL_KEY)
    return raw ? (JSON.parse(raw) as PinnedScrollRecord) : null
  } catch {
    return null
  }
}

function Line({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="mb-3.5 grid grid-cols-[28px_1fr] items-baseline">
      <i aria-hidden="true" className="font-mono text-[11px] not-italic text-muted-foreground/60">
        {n}
      </i>
      {children}
    </div>
  )
}

function Readme({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <Line n={1}>
        <span className="font-mono text-xs text-muted-foreground">{`// projeto ${pad2(index + 1)}`}</span>
      </Line>
      <Line n={2}>
        <h3 className="font-display text-[clamp(24px,2.6vw,36px)] font-bold leading-[1.08] tracking-tight text-balance">
          {project.title}
        </h3>
      </Line>
      <Line n={3}>
        <span className="font-mono text-xs text-muted-foreground">
          # <b className="font-medium text-foreground">{project.kind}</b> · {project.year}
        </span>
      </Line>
      <Line n={4}>
        <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground">
          {project.description}
        </p>
      </Line>
      <Line n={5}>
        <dl className="grid grid-cols-[auto_1fr] gap-x-5.5 gap-y-1.5 font-mono text-xs">
          <dt className="text-muted-foreground">tipo</dt>
          <dd className="font-medium text-foreground">{project.kind}</dd>
          <dt className="text-muted-foreground">stack</dt>
          <dd className="font-medium text-foreground">{project.tags.join(', ')}</dd>
        </dl>
      </Line>
    </>
  )
}

/** Versão fixada da seção Projetos (docs/PLANO-PROJETOS.md): janela de editor ou blocos, a partir dos dados da lista. */
export function ProjectsShowcase({ reanchorHash }: { reanchorHash: boolean }) {
  const uid = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLSpanElement>(null)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)

  // Layout effect: a lista sai e a versão fixada entra no mesmo quadro, sem pintar o meio.
  useLayoutEffect(() => {
    const stage = rootRef.current?.closest<HTMLElement>('[data-projects-stage]')
    const section = stage?.parentElement
    if (!stage || !section) return

    gsap.registerPlugin(ScrollTrigger)
    const detach = attachScrollSync({
      ticker: gsap.ticker,
      update: () => ScrollTrigger.update(),
      refresh: () => ScrollTrigger.refresh(),
    })

    // Salto feito ao trocar a lista pela versão fixada; desfeito na desmontagem (ensaio do StrictMode,
    // voltar com Back) para a próxima montagem medir a partir da posição da lista.
    let compensation: { from: number; to: number } | null = null
    let compensated = false
    const record = readScrollRecord()
    const hashTarget = reanchorHash ? hashTargetOutside(section) : null
    // A rolagem suave nativa até a âncora da URL segue depois do salto (mira o layout da lista);
    // quando ela termina, sem a pessoa ter mexido, volta ao alvo no layout fixado.
    let stopSettle = () => {}
    const settleOnHash = (target: HTMLElement) => {
      const settle = (event: Event) => {
        if (event instanceof CustomEvent) return
        stopSettle()
        if (Math.abs(window.scrollY - anchorY(target)) < 2) return
        jumpTo(anchorY(target))
        ScrollTrigger.update()
      }
      const cancel = () => stopSettle()
      const timer = window.setTimeout(() => settle(new Event('timeout')), 3000)
      window.addEventListener('scrollend', settle, { capture: true })
      USER_INPUTS.forEach((type) => window.addEventListener(type, cancel, { capture: true, passive: true }))
      stopSettle = () => {
        window.clearTimeout(timer)
        window.removeEventListener('scrollend', settle, { capture: true })
        USER_INPUTS.forEach((type) => window.removeEventListener(type, cancel, { capture: true }))
        stopSettle = () => {}
      }
    }

    const onPageHide = () => {
      if (!stage.dataset.mode) return
      const now: PinnedScrollRecord = {
        y: window.scrollY,
        mode: stage.dataset.mode,
        width: window.innerWidth,
        height: window.innerHeight,
      }
      try {
        sessionStorage.setItem(SCROLL_KEY, JSON.stringify(now))
      } catch {}
    }
    window.addEventListener('pagehide', onPageHide)

    const pin = (mode: 'editor' | 'stack') => {
      const scrollBefore = window.scrollY
      const stageRect = stage.getBoundingClientRect()
      const before = {
        stageTop: stageRect.top,
        stageHeight: stageRect.height,
        sectionBottom: section.getBoundingClientRect().bottom,
      }
      stage.dataset.mode = mode
      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: PIN_START,
        end: () => `+=${pinDistance(window.innerHeight, TOTAL)}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setActive(activeProjectIndex(self.progress, TOTAL))
          // `scale`, não `transform`: o `scale-x-0` do Tailwind 4 já usa a propriedade `scale`, e as duas se multiplicam.
          if (fillRef.current) fillRef.current.style.scale = `${self.progress} 1`
        },
      })
      triggerRef.current = trigger

      if (!compensated) {
        compensated = true
        trigger.refresh()
        const current = { y: scrollBefore, mode, width: window.innerWidth, height: window.innerHeight }
        const restored = restoredPinnedScroll(record, current)
        const y =
          restored ??
          (hashTarget ? anchorY(hashTarget) : null) ??
          compensatedScroll(before, {
            sectionBottom: section.getBoundingClientRect().bottom + window.scrollY,
            start: trigger.start,
            end: trigger.end,
          })
        if (y !== null) {
          compensation = { from: scrollBefore, to: y }
          jumpTo(y)
          ScrollTrigger.update()
          if (restored === null && hashTarget) settleOnHash(hashTarget)
        }
      }
      setActive(activeProjectIndex(trigger.progress, TOTAL))

      return () => {
        triggerRef.current = null
        delete stage.dataset.mode
        setActive(0)
      }
    }

    const mm = gsap.matchMedia()
    mm.add(QUERIES.editor, () => pin('editor'))
    mm.add(QUERIES.stack, () => pin('stack'))

    let disposed = false
    // As fontes mudam a altura do cabeçalho da seção, e com ela o início da fixação.
    document.fonts?.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh()
    })

    return () => {
      disposed = true
      window.removeEventListener('pagehide', onPageHide)
      stopSettle()
      const jumped = compensation && Math.abs(window.scrollY - compensation.to) < 2
      mm.revert()
      delete stage.dataset.mode
      if (jumped && compensation) jumpTo(compensation.from)
      detach()
    }
  }, [reanchorHash])

  const goTo = (index: number) => {
    const trigger = triggerRef.current
    if (!trigger) return
    smoothScrollTo(projectScrollTarget(trigger.start, trigger.end, index, TOTAL))
  }

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = tabIndexForKey(event.key, index, TOTAL)
    if (next === null) return
    event.preventDefault()
    tabRefs.current[next]?.focus({ preventScroll: true })
    goTo(next)
  }

  const current = projects[active]

  return (
    <div
      ref={rootRef}
      className="mt-6 hidden group-data-[mode]/stage:block"
    >
      <div className="hidden h-(--eh) flex-none flex-col overflow-hidden rounded-xl border border-border bg-card/60 [--eh:clamp(460px,62svh,540px)] group-data-[mode=editor]/stage:flex">
        <div
          role="tablist"
          aria-label="Projetos"
          className="flex flex-none overflow-x-auto border-b border-border bg-background/50"
        >
          {projects.map((project, i) => {
            const on = i === active
            return (
              <button
                key={project.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${uid}-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => goTo(i)}
                onKeyDown={(event) => onTabKey(event, i)}
                className="relative inline-flex flex-none items-center gap-2.5 border-r border-border px-5.5 py-3.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none aria-selected:bg-card aria-selected:text-foreground aria-selected:after:absolute aria-selected:after:inset-x-0 aria-selected:after:-bottom-px aria-selected:after:h-px aria-selected:after:bg-card"
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${on ? 'bg-primary' : 'bg-transparent'}`}
                />
                {project.file}
              </button>
            )
          })}
        </div>

        <div className="relative min-h-0 flex-1">
          <div aria-hidden="true" className={`absolute inset-0 ${PANES}`}>
            <div className="border-r border-border" />
            <span className="px-6 pt-5 font-mono text-xs text-muted-foreground">{'// preview'}</span>
          </div>
          {projects.map((project, i) => {
            const on = i === active
            return (
              <div
                key={project.id}
                role="tabpanel"
                id={`${uid}-panel-${i}`}
                aria-labelledby={`${uid}-tab-${i}`}
                tabIndex={0}
                inert={!on}
                className={`absolute inset-0 ${PANES}`}
              >
                <div
                  className={`overflow-hidden px-6.5 py-5.5 duration-350 ${FADE} ${
                    on ? 'translate-y-0 opacity-100 delay-80' : 'translate-y-2 opacity-0'
                  }`}
                >
                  <Readme project={project} index={i} />
                </div>
                <div
                  className={`grid min-h-0 place-items-center px-6 pt-12 pb-5 duration-400 ${FADE} ${
                    on ? 'scale-100 opacity-100 delay-80' : 'scale-[0.985] opacity-0'
                  }`}
                >
                  <BrowserFrame
                    project={project}
                    className="w-[min(100%,calc((var(--eh)-150px)*1.6))]"
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex flex-none items-center justify-between gap-4 border-t border-border bg-background/50 px-4.5 py-3 font-mono text-[11px] text-muted-foreground">
          <span>main · {current.file}</span>
          <span className="flex min-w-0 items-center gap-3.5">
            <span>
              <span className="text-primary">{pad2(active + 1)}</span> / {pad2(TOTAL)}
            </span>
            <span aria-hidden="true" className="relative h-px w-30 flex-none bg-border">
              <span ref={fillRef} className="absolute inset-0 origin-left scale-x-0 bg-primary" />
            </span>
            <span className="whitespace-nowrap">
              role para abrir o próximo arquivo ·{' '}
              {/* Âncora de verdade: o Lenis (anchors) a rola, e o foco segue para Contato. */}
              <a href="#contato" className="text-foreground transition-colors hover:text-primary">
                pular ↓
              </a>
            </span>
          </span>
        </div>
      </div>

      <div className="hidden group-data-[mode=stack]/stage:block">
        {/* Empilhados na mesma célula: a altura é a do bloco mais alto, sem posição absoluta. */}
        <div className="grid">
          {projects.map((project, i) => {
            const on = i === active
            return (
              // Sem inert: aqui não há abas, então o leitor de tela precisa alcançar os cinco.
              <article
                key={project.id}
                className={`mx-auto flex w-full max-w-[720px] flex-col gap-5 self-center [grid-area:1/1] duration-350 ${FADE} ${
                  on ? 'translate-y-0 opacity-100 delay-80' : 'pointer-events-none translate-y-3.5 opacity-0'
                }`}
              >
                <div className="grid gap-2.5">
                  <div className="flex gap-3 font-mono text-xs uppercase tracking-widest">
                    <span className="text-primary">
                      {pad2(i + 1)} / {pad2(TOTAL)}
                    </span>
                    <span className="text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                    {project.title}
                  </h3>
                  <p className="max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <ProjectTags tags={project.tags} />
                </div>
                {/* Teto pela altura da tela: no tablet a captura cheia não caberia abaixo do texto. */}
                <BrowserFrame
                  project={project}
                  className="w-[min(100%,calc((100svh-520px)*1.6))]"
                />
              </article>
            )
          })}
        </div>
        <p className="mx-auto mt-4 max-w-[720px] font-mono text-[11px] text-muted-foreground">
          role para o próximo projeto ·{' '}
          <a href="#contato" className="text-foreground transition-colors hover:text-primary">
            pular ↓
          </a>
        </p>
      </div>
    </div>
  )
}
