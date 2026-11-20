import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  INTRO_REVISIT_DAYS,
  INTRO_STORAGE_KEY,
  isIntroForced,
  markVisit,
  readLastVisit,
  shouldShowIntro,
  type IntroInput,
} from './intro-policy.ts'

const DAY = 86_400_000
const now = Date.UTC(2026, 10, 20)
const base = { now, lastVisit: null, storageAvailable: true, forced: false }
const decide = (input: IntroInput) => shouldShowIntro(input, INTRO_REVISIT_DAYS)

describe('shouldShowIntro', () => {
  it('mostra na primeira visita', () => {
    assert.deepEqual(decide(base), { show: true, reason: 'first-visit' })
  })

  it('não mostra quando a última visita foi há menos de 14 dias', () => {
    const result = decide({ ...base, lastVisit: now - 13 * DAY })
    assert.deepEqual(result, { show: false, reason: 'recent' })
  })

  it('não mostra com exatamente 14 dias, só depois', () => {
    assert.equal(decide({ ...base, lastVisit: now - 14 * DAY }).show, false)
    assert.deepEqual(decide({ ...base, lastVisit: now - 14 * DAY - 1 }), {
      show: true,
      reason: 'away',
    })
  })

  it('usa o prazo recebido, não um fixo', () => {
    assert.equal(shouldShowIntro({ ...base, lastVisit: now - 2 * DAY }, 1).show, true)
  })

  it('trata data no futuro como "não viu", mesmo por 1 ms', () => {
    for (const lastVisit of [now + 1, now + DAY]) {
      assert.deepEqual(decide({ ...base, lastVisit }), {
        show: true,
        reason: 'invalid-timestamp',
      })
    }
  })

  it('visita neste mesmo instante conta como recente', () => {
    assert.deepEqual(decide({ ...base, lastVisit: now }), {
      show: false,
      reason: 'recent',
    })
  })

  it('trata valor corrompido, zero e negativo como "não viu"', () => {
    for (const lastVisit of [NaN, Infinity, 0, -5]) {
      assert.deepEqual(decide({ ...base, lastVisit }), {
        show: true,
        reason: 'invalid-timestamp',
      })
    }
  })

  it('pula quando o storage não está disponível', () => {
    const result = decide({ ...base, storageAvailable: false })
    assert.deepEqual(result, { show: false, reason: 'storage-unavailable' })
  })

  it('?intro=1 vence tudo, inclusive storage bloqueado e visita recente', () => {
    assert.deepEqual(decide({ ...base, forced: true, storageAvailable: false }), {
      show: true,
      reason: 'forced',
    })
    assert.equal(decide({ ...base, forced: true, lastVisit: now - DAY }).show, true)
  })
})

describe('isIntroForced', () => {
  it('só reconhece intro=1', () => {
    assert.equal(isIntroForced('?intro=1'), true)
    assert.equal(isIntroForced('?a=2&intro=1'), true)
    assert.equal(isIntroForced('?intro=0'), false)
    assert.equal(isIntroForced('?intro'), false)
    assert.equal(isIntroForced(''), false)
  })
})

describe('readLastVisit e markVisit', () => {
  it('devolve null quando nunca gravou', () => {
    const storage = { getItem: () => null }
    assert.deepEqual(readLastVisit(storage, INTRO_STORAGE_KEY), {
      storageAvailable: true,
      lastVisit: null,
    })
  })

  it('lê o número gravado na chave recebida', () => {
    const storage = { getItem: (key: string) => (key === INTRO_STORAGE_KEY ? '1234' : null) }
    assert.deepEqual(readLastVisit(storage, INTRO_STORAGE_KEY), {
      storageAvailable: true,
      lastVisit: 1234,
    })
    assert.equal(readLastVisit(storage, 'outra').lastVisit, null)
  })

  it('devolve NaN para lixo, que a regra trata como "não viu"', () => {
    const { lastVisit } = readLastVisit({ getItem: () => 'abc' }, INTRO_STORAGE_KEY)
    assert.equal(Number.isNaN(lastVisit), true)
  })

  it('marca storage indisponível quando é nulo ou lança', () => {
    assert.equal(readLastVisit(null, INTRO_STORAGE_KEY).storageAvailable, false)
    const blocked = {
      getItem: () => {
        throw new Error('bloqueado')
      },
    }
    assert.equal(readLastVisit(blocked, INTRO_STORAGE_KEY).storageAvailable, false)
  })

  it('grava o timestamp e avisa quando falha', () => {
    const saved: Record<string, string> = {}
    const storage = { setItem: (k: string, v: string) => void (saved[k] = v) }
    assert.equal(markVisit(storage, INTRO_STORAGE_KEY, 99), true)
    assert.equal(saved[INTRO_STORAGE_KEY], '99')
    assert.equal(markVisit(null, INTRO_STORAGE_KEY, 99), false)
    const full = {
      setItem: () => {
        throw new Error('cheio')
      },
    }
    assert.equal(markVisit(full, INTRO_STORAGE_KEY, 99), false)
  })
})
