'use client'

import { useEffect, useRef } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'
import { subscribePointerField } from '@/lib/motion/pointer-field'

/**
 * Fundo em camadas da página inteira: grade de planta, grade que acende perto
 * do cursor e uma luz ciano difusa. O desenho está em `globals.css`
 * (`.page-field`); aqui só se move a luz.
 *
 * As variáveis vão no próprio contêiner, e não no `<html>`: como custom
 * properties herdam, escrevê-las na raiz recalcularia o estilo da página
 * inteira a cada quadro.
 */
export function PageField() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    // Sem movimento a luz fica no ponto de repouso definido no CSS.
    if (!el || lowMotionReason(readMotionSignals(), LOW_MEMORY_GB)) return

    return subscribePointerField(({ x, y }) => {
      el.style.setProperty('--lx', `${x.toFixed(1)}px`)
      el.style.setProperty('--ly', `${y.toFixed(1)}px`)
    })
  }, [])

  return (
    <div ref={ref} className="page-field" aria-hidden="true">
      <div className="page-field-grid" />
      <div className="page-field-grid-lit" />
      <div className="page-field-glow" />
    </div>
  )
}
