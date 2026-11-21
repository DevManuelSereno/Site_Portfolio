// Lenis na página toda, com um relógio só: rAF próprio até o GSAP chegar, depois o ticker dele.
// Não importa lenis nem gsap: quem os carrega passa os objetos, fora da carga inicial.
import { lowMotionReason, type MotionSignals } from './capability.ts'

/** O pedaço do Lenis que este módulo usa. */
export interface SmoothScroller {
  raf(time: number): void
  on(event: 'scroll', callback: () => void): () => void
  scrollTo(
    target: number | HTMLElement,
    options?: { immediate?: boolean; force?: boolean },
  ): void
  resize(): void
  destroy(): void
}

/** O pedaço do GSAP e do ScrollTrigger que este módulo usa. */
export interface ScrollSync {
  ticker: {
    add(callback: () => void): void
    remove(callback: () => void): void
    lagSmoothing(threshold: number, adjustedLag?: number): void
  }
  update(): void
  refresh(): void
}

/** O Lenis só respeita reduced-motion sozinho; economia de dados e pouca memória também o deixam de fora. */
export function shouldSmoothScroll(signals: MotionSignals, lowMemoryGB: number): boolean {
  return lowMotionReason(signals, lowMemoryGB) === null
}

let lenis: SmoothScroller | null = null
let sync: ScrollSync | null = null
let rafId = 0
let loopTicker: ScrollSync['ticker'] | null = null
let offScroll: (() => void) | null = null

// O tempo do ticker conta desde o carregamento do GSAP e o do rAF desde a navegação; o Lenis
// subtrai um quadro do outro, então os dois precisam da mesma origem (performance.now).
const tick = () => lenis?.raf(performance.now())

const frame = (ms: number) => {
  lenis?.raf(ms)
  rafId = requestAnimationFrame(frame)
}

function stopLoop() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = 0
  loopTicker?.remove(tick)
  loopTicker = null
  offScroll?.()
  offScroll = null
}

function runLoop() {
  stopLoop()
  if (!lenis) return
  if (sync) {
    loopTicker = sync.ticker
    loopTicker.add(tick)
    offScroll = lenis.on('scroll', sync.update)
  } else {
    rafId = requestAnimationFrame(frame)
  }
}

/** Liga a instância (criada com `autoRaf: false`). A função devolvida a destrói. */
export function startSmoothScroll(instance: SmoothScroller): () => void {
  if (lenis && lenis !== instance) lenis.destroy()
  lenis = instance
  runLoop()
  sync?.refresh()
  return () => {
    if (lenis !== instance) return
    stopLoop()
    lenis = null
    instance.destroy()
  }
}

/** Passa o relógio para o GSAP. A função devolvida o devolve ao rAF próprio. */
export function attachScrollSync(next: ScrollSync): () => void {
  sync = next
  // Sem isso o GSAP "pula" quadros depois de um engasgo e o Lenis anda aos trancos.
  next.ticker.lagSmoothing(0)
  runLoop()
  if (lenis) next.refresh()
  return () => {
    if (sync !== next) return
    sync = null
    runLoop()
    next.ticker.lagSmoothing(500, 33)
  }
}

/** Rola com o Lenis quando ele existe; senão, a nativa (suave pelo CSS, se o movimento for permitido). */
export function smoothScrollTo(target: number | HTMLElement) {
  if (lenis) lenis.scrollTo(target)
  else if (typeof target === 'number') window.scrollTo({ top: target })
  else target.scrollIntoView()
}

/** Salto sem animação, para corrigir a posição sem que se veja. */
export function jumpTo(y: number) {
  if (lenis) {
    // O limite do Lenis só se atualiza 250 ms depois de a página mudar de altura.
    lenis.resize()
    lenis.scrollTo(y, { immediate: true, force: true })
  } else {
    window.scrollTo({ top: y, behavior: 'instant' })
  }
}
