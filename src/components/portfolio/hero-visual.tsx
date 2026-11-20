'use client'

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'

import type { HeroVisualMotion } from './hero-visual-motion'

/** Amplitude máxima da inclinação, em graus. */
const TILT_Y = 9
const TILT_X = 7

/**
 * Arte do Hero: o wireframe de uma página que vira interface, já pronto no
 * HTML. A caixa de imagem traz uma silhueta neutra. Para usar uma foto, passe
 * `slot`: ele substitui TODA a arte. Sem texto decorativo, de propósito.
 */
export function HeroVisual({ slot }: { slot?: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const tiltOn = useRef(false)

  useEffect(() => {
    tiltOn.current =
      lowMotionReason(readMotionSignals(), LOW_MEMORY_GB) === null &&
      !window.matchMedia('(hover: none), (pointer: coarse)').matches
  }, [])

  // O desenho só roda com a abertura pendente; senão a arte já está no estado final e o gsap nem carrega.
  useEffect(() => {
    const svg = svgRef.current
    const gate = window.__introGate
    if (!svg || !gate?.show || lowMotionReason(readMotionSignals(), LOW_MEMORY_GB)) return

    let cancelled = false
    let done = false
    let motion: HeroVisualMotion | undefined
    const onDone = () => {
      done = true
      motion?.play()
    }
    window.addEventListener('intro:done', onDone)

    import('./hero-visual-motion')
      .then(({ prepareHeroVisual }) => {
        // O fim da abertura pode ter chegado antes do JS: nada a esconder.
        if (cancelled || done || !gate.show) return
        motion = prepareHeroVisual(svg)
      })
      .catch(() => motion?.revert())

    return () => {
      cancelled = true
      window.removeEventListener('intro:done', onDone)
      motion?.revert()
    }
  }, [slot])

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const box = boxRef.current
    const wrap = wrapRef.current
    if (!box || !wrap || !tiltOn.current || event.pointerType === 'touch') return
    const rect = wrap.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    box.style.setProperty('--ry', `${(px * TILT_Y).toFixed(2)}deg`)
    box.style.setProperty('--rx', `${(-py * TILT_X).toFixed(2)}deg`)
  }

  function onPointerLeave() {
    boxRef.current?.style.setProperty('--rx', '0deg')
    boxRef.current?.style.setProperty('--ry', '0deg')
  }

  // Os handlers ficam num contêiner sem transform: se ficassem no elemento que
  // gira, a rotação encolheria a área de hit na borda e o tilt piscaria.
  return (
    <div
      ref={wrapRef}
      className="mx-auto w-full max-w-xl lg:max-w-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div ref={boxRef} className="hero-visual">
        {slot ?? (
          <svg
            ref={svgRef}
            className="hero-visual-svg"
            viewBox="0 0 568 444"
            aria-hidden="true"
            focusable="false"
          >
            <rect className="hv-draw hv-fill hv-surface" x="20" y="34" width="520" height="380" rx="12" />
            <line className="hv-draw" x1="20" y1="76" x2="540" y2="76" />
            <circle className="hv-draw hv-fill hv-bar" cx="42" cy="55" r="5" />
            <circle className="hv-draw hv-fill hv-bar" cx="60" cy="55" r="5" />
            <circle className="hv-draw hv-fill hv-bar" cx="78" cy="55" r="5" />
            <rect className="hv-draw hv-fill hv-bar" x="440" y="47" width="80" height="16" rx="8" />
            <rect className="hv-draw hv-fill hv-bar" x="44" y="104" width="300" height="26" rx="5" />
            <rect className="hv-draw hv-fill hv-bar" x="44" y="144" width="230" height="10" rx="5" />
            <rect className="hv-draw hv-fill hv-bar" x="44" y="162" width="190" height="10" rx="5" />
            <rect className="hv-draw hv-fill hv-accent" x="44" y="188" width="112" height="34" rx="17" />
            <rect className="hv-draw hv-fill hv-card" x="376" y="100" width="140" height="118" rx="10" />
            <line className="hv-x" x1="376" y1="100" x2="516" y2="218" />
            <line className="hv-x" x1="516" y1="100" x2="376" y2="218" />
            <circle className="hv-draw hv-fill hv-soft" cx="446" cy="146" r="22" />
            <path className="hv-draw hv-fill hv-soft" d="M406 218C406 190 424 176 446 176C468 176 486 190 486 218Z" />
            <rect className="hv-draw hv-fill hv-card" x="44" y="246" width="148" height="144" rx="10" />
            <rect className="hv-draw hv-fill hv-soft" x="60" y="262" width="24" height="24" rx="6" />
            <rect className="hv-draw hv-fill hv-bar" x="60" y="304" width="100" height="10" rx="5" />
            <rect className="hv-draw hv-fill hv-bar" x="60" y="322" width="80" height="8" rx="4" />
            <rect className="hv-draw hv-fill hv-bar" x="60" y="338" width="92" height="8" rx="4" />
            <rect className="hv-draw hv-fill hv-card" x="212" y="246" width="148" height="144" rx="10" />
            <rect className="hv-draw hv-fill hv-soft" x="228" y="262" width="24" height="24" rx="6" />
            <rect className="hv-draw hv-fill hv-bar" x="228" y="304" width="100" height="10" rx="5" />
            <rect className="hv-draw hv-fill hv-bar" x="228" y="322" width="80" height="8" rx="4" />
            <rect className="hv-draw hv-fill hv-bar" x="228" y="338" width="92" height="8" rx="4" />
            <rect className="hv-draw hv-fill hv-card" x="380" y="246" width="136" height="144" rx="10" />
            <rect className="hv-draw hv-fill hv-soft" x="396" y="262" width="24" height="24" rx="6" />
            <rect className="hv-draw hv-fill hv-bar" x="396" y="304" width="92" height="10" rx="5" />
            <rect className="hv-draw hv-fill hv-bar" x="396" y="322" width="72" height="8" rx="4" />
            <rect className="hv-draw hv-fill hv-bar" x="396" y="338" width="84" height="8" rx="4" />
            <g className="hv-cotas">
              <line x1="20" y1="14" x2="540" y2="14" />
              <line x1="20" y1="8" x2="20" y2="20" />
              <line x1="540" y1="8" x2="540" y2="20" />
              <line x1="556" y1="34" x2="556" y2="414" />
              <line x1="550" y1="34" x2="562" y2="34" />
              <line x1="550" y1="414" x2="562" y2="414" />
              <line x1="192" y1="430" x2="212" y2="430" />
              <line x1="192" y1="424" x2="192" y2="436" />
              <line x1="212" y1="424" x2="212" y2="436" />
            </g>
          </svg>
        )}
      </div>
    </div>
  )
}
