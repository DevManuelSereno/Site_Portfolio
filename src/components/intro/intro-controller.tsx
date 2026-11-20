'use client'

import { useLayoutEffect } from 'react'

/** Teto da animação (cerca de 2,9 s) com folga: depois disso o overlay sai de qualquer jeito. */
const INTRO_MAX_MS = 4000

/**
 * Liga a abertura quando o script do `<head>` decidiu mostrá-la. GSAP e
 * FluidUI vêm só por import() dinâmico, então quem não vê a abertura não
 * baixa esse JS. Erro em qualquer ponto tira o overlay e anuncia o fim; só o
 * fim natural conta a visita como vista.
 */
export function IntroController() {
  useLayoutEffect(() => {
    const gate = window.__introGate
    if (!gate?.show) return

    const root = document.documentElement
    // Em dev, o StrictMode zera os atributos do <html> ao remontar; o gate é a fonte da verdade.
    root.classList.add('intro-on')

    let active = true
    let stop: (() => void) | undefined
    let watchdog = 0

    // Aba oculta: o navegador pausa a animação e ninguém a está vendo.
    function onVisibility() {
      if (document.hidden) finish()
    }

    const teardown = () => {
      active = false
      window.clearTimeout(watchdog)
      document.removeEventListener('visibilitychange', onVisibility)
      try {
        stop?.()
      } finally {
        stop = undefined
        root.classList.remove('intro-on')
      }
    }

    function finish(completed = false) {
      if (!active || !gate) return
      gate.show = false
      gate.playing = false
      try {
        teardown()
      } finally {
        if (completed) gate.markSeen?.()
        window.dispatchEvent(new CustomEvent('intro:done'))
      }
    }

    const start = async () => {
      try {
        const { playIntro } = await import('./intro-timeline')
        // O prazo do script do <head> pode ter vencido enquanto o JS chegava.
        if (!active) return
        if (!gate.show) {
          // O `intro:done` já saiu do <head>; solta o listener para não repeti-lo.
          teardown()
          return
        }
        gate.playing = true
        watchdog = window.setTimeout(() => finish(), INTRO_MAX_MS)
        stop = playIntro(() => finish(true))
      } catch {
        finish()
      }
    }

    document.addEventListener('visibilitychange', onVisibility)
    if (document.hidden) finish()
    else start()

    // Desmontagem (ou o ensaio do StrictMode): limpa tudo sem anunciar o fim.
    return () => {
      if (!active) return
      gate.playing = false
      teardown()
    }
  }, [])

  return null
}
