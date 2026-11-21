'use client'

import { useEffect, useState, type ComponentType } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'

type Showcase = ComponentType<{ reanchorHash: boolean }>

// Já carregado nesta visita (voltar com Back): monta no mesmo commit da página, antes de a
// rolagem ser restaurada, porque ela foi gravada com o layout fixado.
let loaded: Showcase | null = null
// A âncora da URL (/#contato) só é refeita na primeira montagem e se a pessoa ainda não rolou.
let touched = false

/** Porta da versão fixada: sem movimento nada é baixado; com, ela e o GSAP vêm perto da seção, para não pesar a carga. */
export function ProjectsMotion() {
  const [Showcase, setShowcase] = useState<Showcase | null>(() => loaded)
  const [reanchorHash, setReanchorHash] = useState(false)

  useEffect(() => {
    if (loaded || lowMotionReason(readMotionSignals(), LOW_MEMORY_GB)) return
    const section = document.getElementById('projetos')
    if (!section) return

    const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    const onInput = () => {
      touched = true
    }
    inputs.forEach((type) => window.addEventListener(type, onInput, { passive: true, capture: true }))

    let cancelled = false
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        import('./projects-showcase')
          .then(({ ProjectsShowcase }) => {
            loaded = ProjectsShowcase
            if (cancelled) return
            setReanchorHash(!touched)
            setShowcase(() => ProjectsShowcase)
          })
          // Sem o módulo, a lista do HTML continua lá.
          .catch(() => {})
      },
      { rootMargin: '1500px 0px' },
    )
    observer.observe(section)

    return () => {
      cancelled = true
      observer.disconnect()
      inputs.forEach((type) => window.removeEventListener(type, onInput, { capture: true }))
    }
  }, [])

  return Showcase ? <Showcase reanchorHash={reanchorHash} /> : null
}
