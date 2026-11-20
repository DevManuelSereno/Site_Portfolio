// Teste de fumaça do HTML servido (etapa 4 do docs/PLANO-MOVIMENTO.md). Exige o
// servidor rodando (`next build && next start -p 3001`); fica fora do `npm test`.
import assert from 'node:assert/strict'
import { before, describe, it } from 'node:test'

import { runGateScript } from './intro-gate-sandbox.ts'

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3001'
const DAY = 86_400_000

let html = ''
let head = ''
let gateScript = ''

const stripTags = (s) => s.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()

before(async () => {
  const res = await fetch(`${BASE_URL}/`)
  assert.equal(res.status, 200)
  html = await res.text()
  head = html.slice(0, html.indexOf('</head>'))
  const inline = [...head.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1])
  gateScript = inline.find((s) => s.includes('__introGate')) ?? ''
})

describe(`HTML servido em ${BASE_URL}`, () => {
  it('tem o <title> com o nome', () => {
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''
    assert.match(title, /Manuel Sereno/)
  })

  it('traz o texto do <h1> do Hero no HTML, sem depender de JS', () => {
    const h1 = stripTags(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '')
    assert.match(h1, /Manuel/)
    assert.match(h1, /Sereno/)
  })

  it('traz o JSON-LD com a Person', () => {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    const types = blocks.flatMap((m) => JSON.parse(m[1])['@graph'] ?? []).map((n) => n['@type'])
    assert.ok(types.includes('Person'))
  })

  it('tem o script do gate no <head>, antes de qualquer script que bloqueie ou hidrate', () => {
    assert.ok(gateScript, 'script do gate não encontrado no <head>')
    const at = html.indexOf(gateScript)
    // CSS e <script async> o React sobe para o topo do <head>; nenhum deles roda
    // antes do gate. O que importa: nenhum script síncrono antes dele e o
    // payload de hidratação (`self.__next_f`, no <body>) depois.
    const blocking = [...head.matchAll(/<script\b([^>]*)\bsrc=[^>]*>/g)].filter(
      (m) => !/\b(async|defer|nomodule)\b/i.test(m[0]) && m.index < at,
    )
    assert.deepEqual(blocking, [])
    const hydration = html.indexOf('self.__next_f')
    assert.ok(hydration === -1 || hydration > at)
  })

  it('o script servido decide como a regra manda', () => {
    const first = runGateScript(gateScript)
    assert.equal(first.classes.has('intro-on'), true)
    // A visita só é gravada quando a abertura termina.
    assert.equal(first.stored, null)
    first.gate.markSeen?.()
    assert.notEqual(first.stored, null)

    const recent = runGateScript(gateScript, { lastVisit: String(Date.now() - DAY) })
    assert.equal(recent.classes.has('intro-on'), false)

    const reduced = runGateScript(gateScript, { reducedMotion: true })
    assert.equal(reduced.classes.has('intro-on'), false)
  })
})
