import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  activeProjectIndex,
  compensatedScroll,
  pinDistance,
  pinnedQueries,
  projectScrollTarget,
  restoredPinnedScroll,
  tabIndexForKey,
} from './project-steps.ts'

describe('activeProjectIndex', () => {
  it('divide o progresso em faixas iguais', () => {
    assert.equal(activeProjectIndex(0, 5), 0)
    assert.equal(activeProjectIndex(0.19, 5), 0)
    assert.equal(activeProjectIndex(0.2, 5), 1)
    assert.equal(activeProjectIndex(0.59, 5), 2)
    assert.equal(activeProjectIndex(0.99, 5), 4)
  })

  it('o fim da fixação fica no último projeto', () => {
    assert.equal(activeProjectIndex(1, 5), 4)
  })

  it('progresso fora de 0 a 1 ou inválido não sai da lista', () => {
    assert.equal(activeProjectIndex(-0.3, 5), 0)
    assert.equal(activeProjectIndex(1.4, 5), 4)
    assert.equal(activeProjectIndex(Number.NaN, 5), 0)
  })

  it('um projeto só: sempre ele', () => {
    assert.equal(activeProjectIndex(0, 1), 0)
    assert.equal(activeProjectIndex(0.5, 1), 0)
    assert.equal(activeProjectIndex(1, 1), 0)
  })

  it('lista vazia devolve 0', () => {
    assert.equal(activeProjectIndex(0.5, 0), 0)
  })
})

describe('projectScrollTarget', () => {
  it('mira o meio da faixa do projeto', () => {
    assert.equal(projectScrollTarget(1000, 2000, 0, 5), 1100)
    assert.equal(projectScrollTarget(1000, 2000, 4, 5), 1900)
  })

  it('o alvo cai no próprio projeto', () => {
    for (let i = 0; i < 5; i++) {
      const y = projectScrollTarget(1000, 2500, i, 5)
      assert.equal(activeProjectIndex((y - 1000) / 1500, 5), i)
    }
  })
})

describe('pinDistance', () => {
  it('0,4 tela por projeto', () => {
    assert.equal(pinDistance(1000, 5), 2000)
    assert.equal(pinDistance(900, 5, 0.6), 2700)
  })
})

describe('tabIndexForKey', () => {
  it('setas andam e voltam nas pontas', () => {
    assert.equal(tabIndexForKey('ArrowRight', 0, 5), 1)
    assert.equal(tabIndexForKey('ArrowRight', 4, 5), 0)
    assert.equal(tabIndexForKey('ArrowLeft', 0, 5), 4)
  })

  it('Home e End vão às pontas', () => {
    assert.equal(tabIndexForKey('Home', 3, 5), 0)
    assert.equal(tabIndexForKey('End', 1, 5), 4)
  })

  it('com uma aba só, toda tecla fica nela', () => {
    for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) {
      assert.equal(tabIndexForKey(key, 0, 1), 0)
    }
  })

  it('outras teclas não navegam', () => {
    assert.equal(tabIndexForKey('Tab', 2, 5), null)
    assert.equal(tabIndexForKey('ArrowDown', 2, 5), null)
  })
})

describe('compensatedScroll', () => {
  const after = { sectionBottom: 4200, start: 1000, end: 2500 }

  it('seção abaixo do topo da janela: nada a corrigir', () => {
    assert.equal(
      compensatedScroll({ stageTop: 300, stageHeight: 2000, sectionBottom: 2400 }, after),
      null,
    )
  })

  it('seção toda acima: o que vem depois fica no lugar', () => {
    // Ela terminava 500 px acima da janela; agora termina em 4200 no documento.
    const before = { stageTop: -2600, stageHeight: 2000, sectionBottom: -500 }
    assert.equal(compensatedScroll(before, after), 4700)
  })

  it('janela dentro da seção: mesma fração da fixação', () => {
    const before = { stageTop: -1000, stageHeight: 2000, sectionBottom: 1100 }
    assert.equal(compensatedScroll(before, after), 1750)
  })

  it('palco já passou mas a seção ainda aparece (`#contato` na carga): Contato fica no lugar', () => {
    const before = { stageTop: -2100, stageHeight: 2000, sectionBottom: 96 }
    assert.equal(compensatedScroll(before, after), 4104)
  })
})

describe('pinnedQueries', () => {
  it('as duas versões fixadas exigem altura mínima e movimento; o resto fica na lista', () => {
    const { editor, stack } = pinnedQueries(700, 680)
    assert.equal(editor, '(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)')
    assert.equal(stack, '(max-width: 1023.98px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)')
  })
})

describe('restoredPinnedScroll', () => {
  const record = { y: 6963, mode: 'stack', width: 390, height: 844 }

  it('mesma versão e tamanho, rolagem restaurada: usa a gravada', () => {
    assert.equal(restoredPinnedScroll(record, { ...record, y: 6963.5 }), 6963)
  })

  it('sem gravação, outro modo, outro tamanho ou rolagem diferente: null', () => {
    assert.equal(restoredPinnedScroll(null, record), null)
    assert.equal(restoredPinnedScroll(record, { ...record, mode: 'editor' }), null)
    assert.equal(restoredPinnedScroll(record, { ...record, width: 1440 }), null)
    assert.equal(restoredPinnedScroll(record, { ...record, height: 700 }), null)
    assert.equal(restoredPinnedScroll(record, { ...record, y: 0 }), null)
  })
})
