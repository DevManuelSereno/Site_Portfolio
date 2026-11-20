import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { NETWORK_MAX_NODES, NETWORK_MIN_NODES, networkNodeCount } from './network.ts'

describe('networkNodeCount', () => {
  it('segue a área (área / 14000) dentro da faixa', () => {
    assert.equal(networkNodeCount(1000, 700), 50)
  })

  it('não passa do teto em telas enormes', () => {
    assert.equal(networkNodeCount(3840, 2160), NETWORK_MAX_NODES)
  })

  it('não cai abaixo do mínimo em áreas pequenas ou vazias', () => {
    assert.equal(networkNodeCount(320, 400), NETWORK_MIN_NODES)
    assert.equal(networkNodeCount(0, 0), NETWORK_MIN_NODES)
  })

  it('trata medida inválida como o mínimo', () => {
    assert.equal(networkNodeCount(Number.NaN, 500), NETWORK_MIN_NODES)
  })
})
