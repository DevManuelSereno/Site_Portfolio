import { gsap } from 'gsap'

/**
 * Desenho do wireframe do Hero. Só chega ao navegador por import() dinâmico,
 * quando a abertura está pendente. O HTML já traz a arte
 * pronta; `prepareHeroVisual` esconde os traços por baixo do overlay e
 * `play` desenha quando a abertura termina.
 */
export interface HeroVisualMotion {
  play: () => void
  /** Devolve a arte ao estado final do HTML. Pode ser chamado mais de uma vez. */
  revert: () => void
}

export function prepareHeroVisual(svg: SVGSVGElement): HeroVisualMotion {
  const strokes = svg.querySelectorAll('.hv-draw')
  const fills = svg.querySelectorAll('.hv-fill')
  const xs = svg.querySelectorAll('.hv-x')
  const cotas = svg.querySelectorAll('.hv-cotas line')

  let ctx: gsap.Context | undefined
  const revert = () => {
    ctx?.revert()
    ctx = undefined
    svg.classList.remove('hv-drawing')
    strokes.forEach((el) => el.removeAttribute('pathLength'))
  }

  try {
    // Com pathLength 1, o dash de 1 cobre qualquer forma, seja o tamanho que for.
    strokes.forEach((el) => el.setAttribute('pathLength', '1'))
    // A troca da cor do traço (acento para neutro) é uma transição de CSS.
    svg.classList.add('hv-drawing')

    let timeline: gsap.core.Timeline | undefined
    ctx = gsap.context(() => {
      gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set(fills, { fillOpacity: 0 })
      gsap.set(cotas, { opacity: 0 })
      gsap.set(xs, { opacity: 1 })
      timeline = gsap
        .timeline({ paused: true, onComplete: revert })
        .to(strokes, { strokeDashoffset: 0, duration: 0.7, stagger: 0.035, ease: 'power1.inOut' }, 0)
        .to(cotas, { opacity: 1, duration: 0.5, stagger: 0.03 }, 0.5)
        .to(fills, { fillOpacity: 1, duration: 0.45, stagger: 0.04, ease: 'power1.out' }, 1.4)
        .add(() => svg.classList.remove('hv-drawing'), 1.7)
        .to(xs, { opacity: 0, duration: 0.5 }, 1.7)
    }, svg)

    return { play: () => timeline?.play(), revert }
  } catch (error) {
    revert()
    throw error
  }
}
