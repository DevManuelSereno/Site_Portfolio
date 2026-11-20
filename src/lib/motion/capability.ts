/**
 * Quando o site deve abrir mão de movimento (decisão do Manuel, 2026-11-20).
 *
 * Reduced-motion, economia de dados e memória declarada de 2 GB ou menos
 * pulam a abertura e deixam o fundo estático. Não há teste de FPS: ele gasta
 * quase o mesmo tempo que a própria abertura e dá falso positivo durante a
 * hidratação. Sinal ausente significa "assume capaz" (Safari e Firefox não
 * informam `deviceMemory`).
 *
 * `lowMotionReason` e `readMotionSignals` também viram texto do script do
 * `<head>` (`intro-gate.ts`): por isso o limite de memória chega por parâmetro.
 */
export interface MotionSignals {
  reducedMotion: boolean
  saveData: boolean
  deviceMemoryGB: number | null
}

export type LowMotionReason = 'reduced-motion' | 'save-data' | 'low-memory'

export const LOW_MEMORY_GB = 2

export function lowMotionReason(
  signals: MotionSignals,
  lowMemoryGB: number,
): LowMotionReason | null {
  if (signals.reducedMotion) return 'reduced-motion'
  if (signals.saveData) return 'save-data'
  if (signals.deviceMemoryGB !== null && signals.deviceMemoryGB <= lowMemoryGB) {
    return 'low-memory'
  }
  return null
}

interface NavigatorWithHints {
  connection?: { saveData?: boolean }
  deviceMemory?: number
}

export function readMotionSignals(): MotionSignals {
  const nav = navigator as Navigator & NavigatorWithHints
  const memory = nav.deviceMemory
  return {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    saveData: nav.connection?.saveData === true,
    deviceMemoryGB: typeof memory === 'number' && memory > 0 ? memory : null,
  }
}
