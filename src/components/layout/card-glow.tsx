'use client'

import { useEffect } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'
import { subscribePointerField } from '@/lib/motion/pointer-field'

/**
 * Brilho de borda dos cards: cada elemento com `data-glow` recebe, enquanto
 * está sob o cursor, a posição da luz relativa a ele (`--gx`, `--gy`). O
 * desenho é o `::after` de `[data-glow]` em `globals.css`.
 *
 * Só escreve no card em hover, para não invalidar estilo dos outros a cada
 * quadro. Sem movimento (toque, reduced-motion, pouca memória) nada é ligado.
 * Reduced-motion e toque escondem o anel pelo CSS; com pouca memória ele
 * aparece parado no centro do card.
 */
export function CardGlow() {
  useEffect(() => {
    if (lowMotionReason(readMotionSignals(), LOW_MEMORY_GB)) return
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-glow]'))
    let x = 0
    let y = 0
    let scrollRaf = 0

    const paint = () => {
      for (const card of cards) {
        if (!card.matches(':hover')) continue
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--gx', `${(x - rect.left).toFixed(1)}px`)
        card.style.setProperty('--gy', `${(y - rect.top).toFixed(1)}px`)
      }
    }

    // Rolar com o cursor parado move o card sob ele, mas o rastreador não emite.
    const onScroll = () => {
      if (scrollRaf) return
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0
        paint()
      })
    }

    const unsubscribe = subscribePointerField((frame) => {
      x = frame.x
      y = frame.y
      paint()
    })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      unsubscribe()
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(scrollRaf)
    }
  }, [])

  return null
}
