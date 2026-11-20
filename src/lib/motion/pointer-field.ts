/**
 * Rastreador de cursor compartilhado: um único loop de animação alimenta a
 * luz do fundo e, nas etapas 5 e 6, a rede de nós do Hero e os cards, em vez
 * de um loop por efeito.
 *
 * O loop só roda enquanto o cursor se move: ao convergir ele para, e volta no
 * próximo `pointermove`. Em toque e com movimento reduzido não há loop nem
 * deriva: quem escuta recebe uma posição fixa. Parar quando nada muda evita
 * repintar a página inteira a 60 fps à toa.
 */
export interface PointerFrame {
  /** Posição suavizada, em pixels da janela. */
  x: number
  y: number
  /** Posição crua do ponteiro, sem suavização. */
  rawX: number
  rawY: number
}

type Listener = (frame: PointerFrame) => void

const SMOOTHING = 0.08
const SETTLED = 0.1
const listeners = new Set<Listener>()
const frame: PointerFrame = { x: 0, y: 0, rawX: 0, rawY: 0 }
let raf = 0
let ready = false
let still = false

function setRest() {
  frame.rawX = frame.x = window.innerWidth * 0.62
  frame.rawY = frame.y = window.innerHeight * 0.38
}

function emit() {
  listeners.forEach((listener) => listener(frame))
}

function tick() {
  raf = requestAnimationFrame(tick)
  frame.x += (frame.rawX - frame.x) * SMOOTHING
  frame.y += (frame.rawY - frame.y) * SMOOTHING

  if (
    Math.abs(frame.rawX - frame.x) < SETTLED &&
    Math.abs(frame.rawY - frame.y) < SETTLED
  ) {
    frame.x = frame.rawX
    frame.y = frame.rawY
    stop()
  }
  emit()
}

function start() {
  if (raf || document.hidden) return
  raf = requestAnimationFrame(tick)
}

function stop() {
  cancelAnimationFrame(raf)
  raf = 0
}

function onPointerMove(event: PointerEvent) {
  frame.rawX = event.clientX
  frame.rawY = event.clientY
  start()
}

function onVisibility() {
  if (document.hidden) stop()
  else start()
}

function setup() {
  ready = true
  still =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    window.matchMedia('(hover: none), (pointer: coarse)').matches
  // Só na primeira vez: com o StrictMode o efeito assina, cancela e assina de
  // novo, e a luz não pode saltar para o ponto de repouso.
  if (!frame.x && !frame.y) setRest()
  if (still) return
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
}

function teardown() {
  stop()
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('visibilitychange', onVisibility)
  ready = false
}

export function subscribePointerField(listener: Listener): () => void {
  if (typeof window === 'undefined') return () => {}
  if (!ready) setup()
  listeners.add(listener)
  listener(frame)

  return () => {
    listeners.delete(listener)
    if (!listeners.size) teardown()
  }
}
