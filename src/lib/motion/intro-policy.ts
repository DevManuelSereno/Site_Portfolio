/**
 * Regra de frequência da abertura (decisão do Manuel, 2026-11-20).
 *
 * Mostra se a pessoa nunca viu ou se ficou mais de 14 dias sem acessar. O
 * timestamp é da última visita (renovado a cada acesso), então quem volta
 * sempre nunca revê a abertura. Fica só no `localStorage` do navegador.
 *
 * As funções viram texto do script inline do `<head>` (`intro-gate.ts`), por
 * isso são autocontidas: chave e prazo chegam por parâmetro, sem tocar em
 * constante ou helper do módulo, que não existiriam dentro do `<script>`.
 */
export const INTRO_STORAGE_KEY = 'ms:last-visit'
export const INTRO_REVISIT_DAYS = 14

export type IntroReason =
  | 'forced'
  | 'storage-unavailable'
  | 'first-visit'
  | 'invalid-timestamp'
  | 'away'
  | 'recent'

export interface IntroInput {
  now: number
  lastVisit: number | null
  storageAvailable: boolean
  forced: boolean
}

export function shouldShowIntro(
  input: IntroInput,
  revisitDays: number,
): {
  show: boolean
  reason: IntroReason
} {
  if (input.forced) return { show: true, reason: 'forced' }

  // Sem como gravar a visita, a abertura apareceria em toda carga. É melhor
  // pular do que repetir.
  if (!input.storageAvailable) return { show: false, reason: 'storage-unavailable' }

  if (input.lastVisit === null) return { show: true, reason: 'first-visit' }

  // Valor corrompido ou data no futuro (relógio alterado) conta como "não viu".
  const last = input.lastVisit
  if (!Number.isFinite(last) || last <= 0 || last > input.now) {
    return { show: true, reason: 'invalid-timestamp' }
  }

  const limit = revisitDays * 86_400_000
  return input.now - last > limit
    ? { show: true, reason: 'away' }
    : { show: false, reason: 'recent' }
}

export function isIntroForced(search: string): boolean {
  return new URLSearchParams(search).get('intro') === '1'
}

/** O simples acesso a `window.localStorage` já lança em alguns modos privados. */
export function getLocalStorage(): Storage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readLastVisit(
  storage: Pick<Storage, 'getItem'> | null,
  key: string,
): {
  storageAvailable: boolean
  lastVisit: number | null
} {
  if (!storage) return { storageAvailable: false, lastVisit: null }
  try {
    const raw = storage.getItem(key)
    return { storageAvailable: true, lastVisit: raw === null ? null : Number(raw) }
  } catch {
    return { storageAvailable: false, lastVisit: null }
  }
}

export function markVisit(
  storage: Pick<Storage, 'setItem'> | null,
  key: string,
  now: number,
): boolean {
  if (!storage) return false
  try {
    storage.setItem(key, String(now))
    return true
  } catch {
    return false
  }
}
