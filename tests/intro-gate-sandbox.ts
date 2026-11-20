import vm from 'node:vm'

import { INTRO_STORAGE_KEY } from '../src/lib/motion/intro-policy.ts'

/**
 * Roda o script do gate em `node:vm` com um navegador de mentira. Serve ao
 * teste unitário (texto gerado) e ao de fumaça (texto vindo do HTML servido).
 */
export interface GateScenario {
  lastVisit?: string
  blockedStorage?: boolean
  search?: string
  pathname?: string
  hidden?: boolean
  reducedMotion?: boolean
  saveData?: boolean
  deviceMemory?: number
}

export function runGateScript(script: string, scenario: GateScenario = {}) {
  const store = new Map<string, string>()
  if (scenario.lastVisit !== undefined) store.set(INTRO_STORAGE_KEY, scenario.lastVisit)

  const classes = new Set<string>()
  const timers: Array<() => void> = []
  const events: string[] = []
  const storage = {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
  }

  const win: Record<string, unknown> = {
    document: {
      visibilityState: scenario.hidden ? 'hidden' : 'visible',
      documentElement: {
        classList: {
          add: (c: string) => void classes.add(c),
          remove: (c: string) => void classes.delete(c),
        },
      },
    },
    navigator: {
      connection: { saveData: scenario.saveData === true },
      deviceMemory: scenario.deviceMemory,
    },
    location: { search: scenario.search ?? '', pathname: scenario.pathname ?? '/' },
    matchMedia: (query: string) => ({
      matches: query.includes('reduce') && scenario.reducedMotion === true,
    }),
    dispatchEvent: (event: { type: string }) => void events.push(event.type),
    setTimeout: (fn: () => void) => timers.push(fn),
    // API web, não built-in do JS: o contexto do vm não a traz.
    URLSearchParams,
    CustomEvent: function CustomEvent(this: { type: string }, type: string) {
      this.type = type
    },
  }
  win.window = win
  // Modo privado do Safari: o simples acesso a `localStorage` lança.
  Object.defineProperty(win, 'localStorage', {
    get() {
      if (scenario.blockedStorage) throw new Error('SecurityError')
      return storage
    },
  })

  vm.runInNewContext(script, win)
  const gate = win.__introGate as {
    show: boolean
    reason: string
    playing?: boolean
    markSeen?: () => void
  }

  return {
    gate,
    // `stored` é lido na hora: a visita só é gravada pelo script quando não há abertura.
    get stored() {
      return store.get(INTRO_STORAGE_KEY) ?? null
    },
    classes,
    events,
    runTimers: () => timers.forEach((fn) => fn()),
  }
}
