// Contas puras da seção Projetos fixada (docs/PLANO-PROJETOS.md), testáveis sem navegador.

/** Rolagem por projeto, em telas (0,3 no protótipo; o Manuel pediu 0,4 no código). */
export const SCROLL_PER_PROJECT = 0.4

/** Altura mínima da janela para cada versão fixada caber abaixo do cabeçalho do site; abaixo disso, fica a lista. */
export const EDITOR_MIN_HEIGHT = 700
export const STACK_MIN_HEIGHT = 680

export function pinnedQueries(editorMinHeight = EDITOR_MIN_HEIGHT, stackMinHeight = STACK_MIN_HEIGHT) {
  const motion = '(prefers-reduced-motion: no-preference)'
  return {
    editor: `(min-width: 1024px) and (min-height: ${editorMinHeight}px) and ${motion}`,
    stack: `(max-width: 1023.98px) and (min-height: ${stackMinHeight}px) and ${motion}`,
  }
}

/** Distância, em pixels, que a seção fica fixada. */
export function pinDistance(
  viewportHeight: number,
  count: number,
  perProject = SCROLL_PER_PROJECT,
): number {
  return Math.round(perProject * viewportHeight * count)
}

/** Projeto aberto para um progresso de 0 a 1: faixas iguais, e o fim (1) fica no último. */
export function activeProjectIndex(progress: number, count: number): number {
  if (count <= 0) return 0
  const p = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0
  return Math.min(count - 1, Math.floor(p * count))
}

/** Posição de rolagem que abre o projeto: o meio da faixa dele, longe das trocas. */
export function projectScrollTarget(
  start: number,
  end: number,
  index: number,
  count: number,
): number {
  return start + ((index + 0.5) / count) * (end - start)
}

/** Aba de destino para a tecla (roving tabindex, com volta nas pontas), ou null. */
export function tabIndexForKey(key: string, current: number, count: number): number | null {
  if (key === 'ArrowRight') return (current + 1) % count
  if (key === 'ArrowLeft') return (current - 1 + count) % count
  if (key === 'Home') return 0
  if (key === 'End') return count - 1
  return null
}

/** Rolagem e versão fixada no momento em que a página foi deixada (sessionStorage). */
export interface PinnedScrollRecord {
  y: number
  mode: string
  width: number
  height: number
}

/**
 * Ao recarregar, o navegador devolve a rolagem gravada com o layout fixado, mas a aplica sobre a
 * lista. Se a gravação é do mesmo modo e tamanho e a rolagem atual é ela, devolve essa posição.
 */
export function restoredPinnedScroll(
  record: PinnedScrollRecord | null,
  current: PinnedScrollRecord,
): number | null {
  if (!record || record.mode !== current.mode) return null
  if (record.width !== current.width || record.height !== current.height) return null
  return Math.abs(record.y - current.y) < 2 ? record.y : null
}

export interface PinLayout {
  /** Topo do elemento fixado, relativo à janela. */
  stageTop: number
  stageHeight: number
  /** Fim da seção, relativo à janela. */
  sectionBottom: number
}

/**
 * Onde rolar quando a lista vira a versão fixada, para a tela não saltar: palco já passado mantém
 * o que vem depois no lugar; topo da janela no palco vai à mesma fração da fixação; senão, null.
 */
export function compensatedScroll(
  before: PinLayout,
  // Em coordenadas do documento, para não depender de quanto o navegador já ancorou a rolagem.
  after: { sectionBottom: number; start: number; end: number },
): number | null {
  if (before.stageTop >= 0) return null
  if (before.stageTop + before.stageHeight <= 0) return after.sectionBottom - before.sectionBottom
  const fraction = -before.stageTop / Math.max(1, before.stageHeight)
  return after.start + fraction * (after.end - after.start)
}
