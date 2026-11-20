'use client'

import { useEffect } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'

/**
 * Entrada em scroll dos projetos: a imagem se revela por `clip-path` e o texto
 * sobe e aparece. Só em telas largas e com movimento; no celular e com
 * reduced-motion a lista fica como o HTML a serve. O conteúdo está sempre no
 * HTML, e o GSAP só entra por import() dinâmico quando vai ser usado.
 */
export function ProjectsMotion() {
  useEffect(() => {
    if (lowMotionReason(readMotionSignals(), LOW_MEMORY_GB)) return

    // Mobile não anima: nem baixa o GSAP.
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const section = document.getElementById('projetos')
    if (!section) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        document.querySelectorAll<HTMLElement>('[data-project]').forEach((row) => {
          const media = row.querySelector('[data-project-media]')
          const text = row.querySelector('[data-project-text]')?.children
          const scrollTrigger = { trigger: row, start: 'top 70%', once: true }
          if (media) {
            // fromTo e clearProps: sem clip-path no CSS o GSAP não interpola até
            // `none`, e um clip-path inline no fim recortaria o ::after do CardGlow.
            gsap.fromTo(
              media,
              { clipPath: 'inset(0 0 100% 0)' },
              {
                clipPath: 'inset(0 0 0% 0)',
                duration: 0.9,
                ease: 'power3.out',
                clearProps: 'clipPath',
                scrollTrigger,
              },
            )
          }
          if (text) {
            gsap.from(text, {
              y: 24,
              opacity: 0,
              duration: 0.7,
              delay: 0.2,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger,
            })
          }
        })
      })
      cleanup = () => mm.revert()
    }

    // O GSAP só é baixado quando a seção está perto da tela, para não pesar a
    // carga inicial.
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        void run()
      },
      { rootMargin: '1500px 0px' },
    )
    observer.observe(section)

    return () => {
      cancelled = true
      observer.disconnect()
      cleanup?.()
    }
  }, [])

  return null
}
