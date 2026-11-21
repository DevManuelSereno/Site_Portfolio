'use client'

import { useEffect } from 'react'

import { LOW_MEMORY_GB, readMotionSignals } from '@/lib/motion/capability'
import { shouldSmoothScroll, startSmoothScroll } from '@/lib/motion/smooth-scroll'

/**
 * Cria o Lenis uma vez, na página toda, quando o movimento é permitido. Ele
 * vem por import() dinâmico, fora do caminho da hidratação. Fica parado
 * enquanto a abertura roda e anda no `intro:done` (que sai também quando ela
 * é abandonada). O toque continua nativo (`syncTouch` desligado).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (!shouldSmoothScroll(readMotionSignals(), LOW_MEMORY_GB)) return

    let cancelled = false
    let stop: (() => void) | undefined
    let onIntroDone: (() => void) | undefined

    import('lenis')
      .then(({ default: Lenis }) => {
        if (cancelled) return
        // anchors: o Lenis já desconta o `scroll-margin-top` (scroll-mt-24) do alvo, então sem offset extra.
        const lenis = new Lenis({ autoRaf: false, anchors: true, syncTouch: false })
        stop = startSmoothScroll(lenis)
        if (window.__introGate?.show) {
          lenis.stop()
          onIntroDone = () => lenis.start()
          window.addEventListener('intro:done', onIntroDone, { once: true })
        }
      })
      // Sem o Lenis, a rolagem nativa (suave pelo CSS) segue.
      .catch(() => {})

    return () => {
      cancelled = true
      if (onIntroDone) window.removeEventListener('intro:done', onIntroDone)
      stop?.()
    }
  }, [])

  return null
}
