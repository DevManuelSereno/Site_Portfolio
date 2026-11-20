import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { LOW_MEMORY_GB, lowMotionReason as reasonWith, type MotionSignals } from './capability.ts'

const capable: MotionSignals = { reducedMotion: false, saveData: false, deviceMemoryGB: 8 }
const lowMotionReason = (signals: MotionSignals) => reasonWith(signals, LOW_MEMORY_GB)

describe('lowMotionReason', () => {
  it('devolve null em aparelho capaz', () => {
    assert.equal(lowMotionReason(capable), null)
  })

  it('assume capaz quando o navegador não informa a memória', () => {
    assert.equal(lowMotionReason({ ...capable, deviceMemoryGB: null }), null)
  })

  it('reconhece cada sinal', () => {
    assert.equal(lowMotionReason({ ...capable, reducedMotion: true }), 'reduced-motion')
    assert.equal(lowMotionReason({ ...capable, saveData: true }), 'save-data')
    assert.equal(lowMotionReason({ ...capable, deviceMemoryGB: 2 }), 'low-memory')
    assert.equal(lowMotionReason({ ...capable, deviceMemoryGB: 0.5 }), 'low-memory')
  })

  it('3 GB já conta como capaz', () => {
    assert.equal(lowMotionReason({ ...capable, deviceMemoryGB: 3 }), null)
  })

  it('usa o limite recebido, não um fixo', () => {
    assert.equal(reasonWith({ ...capable, deviceMemoryGB: 4 }, 4), 'low-memory')
  })

  it('reduced-motion vence os outros sinais', () => {
    const all = { reducedMotion: true, saveData: true, deviceMemoryGB: 1 }
    assert.equal(lowMotionReason(all), 'reduced-motion')
  })
})
