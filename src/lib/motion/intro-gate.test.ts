import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { runGateScript } from '../../../tests/intro-gate-sandbox.ts'
import { INTRO_LOAD_BUDGET_MS, introGateScript } from './intro-gate.ts'

const DAY = 86_400_000
const run = (scenario?: Parameters<typeof runGateScript>[1]) =>
  runGateScript(introGateScript, scenario)
const plain = (gate: { show: boolean; reason: string }) => ({
  show: gate.show,
  reason: gate.reason,
})

describe('introGateScript', () => {
  it('primeira visita: liga a abertura e só grava a visita quando ela termina', () => {
    const before = Date.now()
    const page = run()
    assert.deepEqual(plain(page.gate), { show: true, reason: 'first-visit' })
    assert.equal(page.classes.has('intro-on'), true)
    assert.equal(page.stored, null)

    page.gate.markSeen?.()
    assert.ok(Number(page.stored) >= before)
  })

  it('visita recente: sem abertura, timestamp renovado', () => {
    const last = Date.now() - DAY
    const { gate, classes, stored } = run({ lastVisit: String(last) })
    assert.equal(gate.reason, 'recent')
    assert.equal(classes.has('intro-on'), false)
    assert.ok(Number(stored) > last)
  })

  it('15 dias depois: mostra de novo, sem renovar antes do fim', () => {
    const last = String(Date.now() - 15 * DAY)
    const { gate, classes, stored } = run({ lastVisit: last })
    assert.equal(gate.reason, 'away')
    assert.equal(classes.has('intro-on'), true)
    assert.equal(stored, last)
  })

  it('fora da home: pula e não gasta a visita', () => {
    const { gate, classes, stored } = run({ pathname: '/privacidade' })
    assert.deepEqual(plain(gate), { show: false, reason: 'not-home' })
    assert.equal(classes.has('intro-on'), false)
    assert.equal(stored, null)
  })

  it('aba oculta ao carregar: pula e não conta a visita', () => {
    const { gate, classes, stored } = run({ hidden: true })
    assert.deepEqual(plain(gate), { show: false, reason: 'hidden' })
    assert.equal(classes.has('intro-on'), false)
    assert.equal(stored, null)
  })

  it('storage que lança: pula', () => {
    const { gate, classes } = run({ blockedStorage: true })
    assert.deepEqual(plain(gate), { show: false, reason: 'storage-unavailable' })
    assert.equal(classes.has('intro-on'), false)
  })

  it('memória de 2 GB, saveData e reduced-motion pulam mesmo com ?intro=1', () => {
    const cases = [
      [{ deviceMemory: 2 }, 'low-memory'],
      [{ saveData: true }, 'save-data'],
      [{ reducedMotion: true }, 'reduced-motion'],
    ] as const
    for (const [signals, reason] of cases) {
      const { gate, classes, stored } = run({ ...signals, search: '?intro=1' })
      assert.deepEqual(plain(gate), { show: false, reason })
      assert.equal(classes.has('intro-on'), false)
      // Não havia abertura a mostrar: a visita conta.
      assert.notEqual(stored, null)
    }
  })

  it('?intro=1 com visita recente: mostra e deixa a visita como estava', () => {
    const last = String(Date.now())
    const { gate, classes, stored } = run({ lastVisit: last, search: '?intro=1' })
    assert.equal(gate.reason, 'forced')
    assert.equal(classes.has('intro-on'), true)
    assert.equal(stored, last)
  })

  it('tira o overlay se a abertura não começou dentro do prazo, sem contar a visita', () => {
    const idle = run()
    idle.runTimers()
    assert.equal(idle.classes.has('intro-on'), false)
    assert.equal(idle.gate.show, false)
    assert.equal(idle.gate.reason, 'timeout')
    assert.equal(idle.stored, null)
    assert.deepEqual(idle.events, ['intro:done'])

    const playing = run()
    playing.gate.playing = true
    playing.runTimers()
    assert.equal(playing.classes.has('intro-on'), true)
    assert.deepEqual(playing.events, [])
  })

  it('o prazo de carga é curto, para a abertura não passar do teto de 3 s', () => {
    assert.ok(INTRO_LOAD_BUDGET_MS <= 2000)
  })
})
