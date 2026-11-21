import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { LOW_MEMORY_GB, type MotionSignals } from './capability.ts'
import {
  attachScrollSync,
  shouldSmoothScroll,
  startSmoothScroll,
  type ScrollSync,
  type SmoothScroller,
} from './smooth-scroll.ts'

const capable: MotionSignals = { reducedMotion: false, saveData: false, deviceMemoryGB: 8 }

describe('shouldSmoothScroll', () => {
  it('cria o Lenis em aparelho capaz ou sem informar memória', () => {
    assert.equal(shouldSmoothScroll(capable, LOW_MEMORY_GB), true)
    assert.equal(shouldSmoothScroll({ ...capable, deviceMemoryGB: null }, LOW_MEMORY_GB), true)
  })

  it('não cria com reduced-motion, economia de dados ou pouca memória', () => {
    assert.equal(shouldSmoothScroll({ ...capable, reducedMotion: true }, LOW_MEMORY_GB), false)
    assert.equal(shouldSmoothScroll({ ...capable, saveData: true }, LOW_MEMORY_GB), false)
    assert.equal(shouldSmoothScroll({ ...capable, deviceMemoryGB: 2 }, LOW_MEMORY_GB), false)
  })
})

// rAF falso: guarda os callbacks pendentes para contar quantos loops existem.
let pending = new Map<number, (t: number) => void>()
let nextId = 1
const g = globalThis as Record<string, unknown>

beforeEach(() => {
  pending = new Map()
  g.requestAnimationFrame = (cb: (t: number) => void) => {
    const id = nextId++
    pending.set(id, cb)
    return id
  }
  g.cancelAnimationFrame = (id: number) => pending.delete(id)
})

afterEach(() => {
  delete g.requestAnimationFrame
  delete g.cancelAnimationFrame
})

function fakeLenis() {
  const calls = { raf: [] as number[], destroyed: 0, scrollListeners: 0 }
  const lenis: SmoothScroller = {
    raf: (t) => void calls.raf.push(t),
    on: () => {
      calls.scrollListeners++
      return () => void calls.scrollListeners--
    },
    scrollTo: () => {},
    resize: () => {},
    destroy: () => void calls.destroyed++,
  }
  return { lenis, calls }
}

function fakeSync() {
  const listeners = new Set<() => void>()
  const calls = { refresh: 0, lag: [] as number[] }
  const sync: ScrollSync = {
    ticker: {
      add: (cb) => void listeners.add(cb),
      remove: (cb) => void listeners.delete(cb),
      lagSmoothing: (threshold) => void calls.lag.push(threshold),
    },
    update: () => {},
    refresh: () => void calls.refresh++,
  }
  return { sync, listeners, calls }
}

function flushFrame(time: number) {
  const callbacks = [...pending.values()]
  pending.clear()
  callbacks.forEach((cb) => cb(time))
}

describe('relógio do Lenis', () => {
  it('sem GSAP, roda num rAF próprio, em milissegundos', () => {
    const { lenis, calls } = fakeLenis()
    const stop = startSmoothScroll(lenis)
    assert.equal(pending.size, 1)
    flushFrame(16)
    assert.deepEqual(calls.raf, [16])
    assert.equal(pending.size, 1)
    stop()
    assert.equal(pending.size, 0)
    assert.equal(calls.destroyed, 1)
  })

  it('com o GSAP, passa ao ticker e larga o rAF; nunca os dois', () => {
    const { lenis, calls } = fakeLenis()
    const stop = startSmoothScroll(lenis)
    const { sync, listeners, calls: syncCalls } = fakeSync()
    const detach = attachScrollSync(sync)

    assert.equal(pending.size, 0)
    assert.equal(listeners.size, 1)
    assert.equal(calls.scrollListeners, 1)
    assert.deepEqual(syncCalls.lag, [0])
    assert.equal(syncCalls.refresh, 1)

    detach()
    assert.equal(listeners.size, 0)
    assert.equal(calls.scrollListeners, 0)
    assert.equal(pending.size, 1)
    stop()
    assert.equal(pending.size, 0)
  })

  it('a troca rAF → ticker mantém o relógio crescente (mesma origem do rAF)', () => {
    const { lenis, calls } = fakeLenis()
    const stop = startSmoothScroll(lenis)
    flushFrame(performance.now())
    const { sync, listeners } = fakeSync()
    const detach = attachScrollSync(sync)
    // O ticker do GSAP chamaria com segundos desde o carregamento dele; o tick ignora esse valor.
    ;[...listeners][0]()
    ;[...listeners][0]()
    detach()
    flushFrame(performance.now())
    stop()
    assert.equal(calls.raf.length, 4)
    for (let i = 1; i < calls.raf.length; i++) {
      assert.ok(calls.raf[i] >= calls.raf[i - 1], `relógio voltou: ${calls.raf.join(', ')}`)
    }
  })

  it('GSAP antes do Lenis: a instância já nasce no ticker', () => {
    const { sync, listeners, calls: syncCalls } = fakeSync()
    const detach = attachScrollSync(sync)
    assert.equal(listeners.size, 0)
    const { lenis } = fakeLenis()
    const stop = startSmoothScroll(lenis)
    assert.equal(listeners.size, 1)
    assert.equal(pending.size, 0)
    assert.equal(syncCalls.refresh, 1)
    stop()
    assert.equal(listeners.size, 0)
    detach()
    assert.equal(pending.size, 0)
  })

  it('uma instância só: a nova destrói a anterior, e o cleanup velho não derruba a nova', () => {
    const a = fakeLenis()
    const stopA = startSmoothScroll(a.lenis)
    const b = fakeLenis()
    const stopB = startSmoothScroll(b.lenis)
    assert.equal(a.calls.destroyed, 1)
    assert.equal(pending.size, 1)
    stopA()
    assert.equal(b.calls.destroyed, 0)
    flushFrame(16)
    assert.deepEqual(b.calls.raf, [16])
    assert.deepEqual(a.calls.raf, [])
    stopB()
    assert.equal(pending.size, 0)
  })
})
