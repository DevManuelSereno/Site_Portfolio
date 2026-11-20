import { gsap } from 'gsap'
import { createMorpher, play, shapes } from '@usefluid/motion'

import { LOGO_BBOX, LOGO_BOLD, LOGO_REGULAR } from '@/lib/motion/logo-paths'

/**
 * Sequência da abertura, a do protótipo aprovado (`Prancha Viva Morph`, v4),
 * em cerca de 2,9 s. O GSAP cuida da grade, das réguas e do voo; o FluidUI,
 * do morph ponto, círculo, quadrado, logo. Só chega ao navegador por import()
 * dinâmico, quando o script do `<head>` decidiu mostrar a abertura.
 */
/** Passo da grade, igual ao `background-size` de `.intro-grid` e `.page-field-grid`. */
const UNIT = 48

/** Cota sob o logo (y 86 a 95 da caixa de 120) e carimbo de legenda. */
function buildLabels(overlay: HTMLElement, cotaSvg: SVGSVGElement) {
  cotaSvg.innerHTML =
    '<g class="intro-cota"><line x1="4" y1="86" x2="116" y2="86"/>' +
    '<line x1="4" y1="83" x2="4" y2="89"/><line x1="116" y1="83" x2="116" y2="89"/>' +
    '<text x="60" y="95" text-anchor="middle">144 u</text></g>'
  overlay.insertAdjacentHTML(
    'beforeend',
    '<div class="intro-stamp"><div><span>Obra</span>Portfólio</div>' +
      '<div><span>Autor</span>M. Sereno</div><div><span>Folha</span>01 / 01 · esc 1:1</div></div>',
  )
}

/** Plano cartesiano com origem no centro, réguas numeradas e a janela do logo. */
function buildAxes(overlay: HTMLElement, axes: SVGSVGElement, fly: SVGSVGElement) {
  const { width: w, height: h } = overlay.getBoundingClientRect()
  const cx = w / 2
  const cy = h / 2
  const nx = Math.floor((cx - 40) / UNIT)
  const ny = Math.floor((cy - 40) / UNIT)
  const ex = nx * UNIT + 20
  const ey = ny * UNIT + 20
  const line = (cls: string, x1: number, y1: number, x2: number, y2: number) =>
    `<line class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" pathLength="1"/>`

  let s =
    line('ax', cx, cy, cx + ex, cy) +
    line('ax', cx, cy, cx - ex, cy) +
    line('ax', cx, cy, cx, cy - ey) +
    line('ax', cx, cy, cx, cy + ey)
  s += `<polyline class="hd" points="${cx + ex - 6},${cy - 4} ${cx + ex},${cy} ${cx + ex - 6},${cy + 4}"/>`
  s += `<polyline class="hd" points="${cx - 4},${cy - ey + 6} ${cx},${cy - ey} ${cx + 4},${cy - ey + 6}"/>`
  for (let i = -nx; i <= nx; i++) {
    if (!i) continue
    const x = cx + i * UNIT
    const label = i % 2 === 0 ? `<text x="${x}" y="${cy + 19}" text-anchor="middle">${i}</text>` : ''
    s += `<g class="tx"><line class="tk" x1="${x}" y1="${cy - 4}" x2="${x}" y2="${cy + 4}"/>${label}</g>`
  }
  for (let i = -ny; i <= ny; i++) {
    if (!i) continue
    const y = cy + i * UNIT
    const label = i % 2 === 0 ? `<text x="${cx + 10}" y="${y + 3}">${-i}</text>` : ''
    s += `<g class="ty"><line class="tk" x1="${cx - 4}" y1="${y}" x2="${cx + 4}" y2="${y}"/>${label}</g>`
  }
  s += `<text x="${cx + 11}" y="${cy + 19}">0</text><circle class="org" cx="${cx}" cy="${cy}" r="10"/>`
  for (let i = 120; i < w - 40; i += 120) {
    s += `<text class="rn" x="${i}" y="27" text-anchor="middle">${i}</text>`
  }
  for (let i = 120; i < h - 40; i += 120) s += `<text class="rn" x="20" y="${i + 3}">${i}</text>`

  // Janela limpa ao redor do logo e da cota "144 u" (que vai até y = 96).
  const k = fly.getBoundingClientRect().width / 120
  const pad = 18
  const hx = cx + (LOGO_BBOX.x - 60) * k - pad
  const hy = cy + (LOGO_BBOX.y - 60) * k - pad
  const hw = LOGO_BBOX.width * k + pad * 2
  const hh = (96 - LOGO_BBOX.y) * k + pad + 10
  axes.innerHTML =
    `<defs><mask id="intro-axmask" maskUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}">` +
    `<rect width="${w}" height="${h}" fill="#fff"/>` +
    `<rect class="hole" x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="10" fill="#000" opacity="0"/>` +
    `</mask></defs><g mask="url(#intro-axmask)">${s}</g>`
}

/** Roda a abertura e chama `onDone` no fim. Devolve a limpeza completa. */
export function playIntro(onDone: () => void): () => void {
  const overlay = document.getElementById('intro')
  const fly = document.querySelector<SVGSVGElement>('#intro-fly')
  const flyPath = fly?.querySelector('path')
  const axes = overlay?.querySelector<SVGSVGElement>('.intro-axes')
  const cotaSvg = overlay?.querySelector<SVGSVGElement>('.intro-shapes')
  const target = document.querySelector<SVGPathElement>('.site-logo path')
  if (!overlay || !fly || !flyPath || !axes || !cotaSvg || !target) {
    throw new Error('abertura sem markup')
  }

  const morph = createMorpher(shapes.dot, { w: 15, z: 0.8 })
  let stopTicker: (() => void) | null = null
  const morphTo = (d: string) => {
    morph.to(d)
    if (stopTicker) return
    stopTicker = play((dt) => {
      const moving = morph.step(dt)
      flyPath.setAttribute('d', morph.path())
      if (!moving) stopTicker = null
      return moving
    })
  }

  // Leva o centro do caminho voador ao centro do logo do cabeçalho, na escala dele.
  const flight = () => {
    const f = fly.getBoundingClientRect()
    const r = flyPath.getBoundingClientRect()
    const b = target.getBoundingClientRect()
    const scale = r.width ? b.width / r.width : 1
    const fx = f.left + f.width / 2
    const fy = f.top + f.height / 2
    return {
      scale,
      x: b.left + b.width / 2 - fx - scale * (r.left + r.width / 2 - fx),
      y: b.top + b.height / 2 - fy - scale * (r.top + r.height / 2 - fy),
    }
  }

  flyPath.setAttribute('d', shapes.dot)
  buildAxes(overlay, axes, fly)
  buildLabels(overlay, cotaSvg)
  const q = (selector: string) => overlay.querySelectorAll(selector)

  const ctx = gsap.context(() => {
    const decor = q('.intro-axes, .intro-ruler, .intro-mark, .intro-stamp, .intro-cota, .intro-grid')
    gsap.set(fly, { opacity: 0, scale: 1, x: 0, y: 0, xPercent: -50, yPercent: -50 })

    gsap
      .timeline({ onComplete: onDone })
      .fromTo(q('.intro-grid'), { '--r': '0px' }, { '--r': '1200px', duration: 1.3, ease: 'power2.out' }, 0)
      .fromTo(q('.intro-axes .ax'), { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out' }, 0.1)
      .fromTo(q('.intro-axes .hd'), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.7)
      .fromTo(q('.intro-axes .tx'), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: { each: 0.012, from: 'center' } }, 0.25)
      .fromTo(q('.intro-axes .ty'), { opacity: 0 }, { opacity: 1, duration: 0.25, stagger: { each: 0.012, from: 'center' } }, 0.25)
      .fromTo(q('.intro-axes .rn'), { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.03 }, 0.5)
      .fromTo(q('.intro-axes .org'), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' }, 0.3)
      .fromTo(q('.intro-ruler-top'), { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 0.15)
      .fromTo(q('.intro-ruler-left'), { scaleY: 0 }, { scaleY: 1, duration: 0.7, ease: 'power2.out' }, 0.15)
      .fromTo(q('.intro-mark'), { scale: 0 }, { scale: 1, duration: 0.45, ease: 'power2.out', stagger: 0.06 }, 0.3)
      .set(fly, { opacity: 1 }, 0.35)
      .add(() => morphTo(shapes.circle), 0.4)
      .add(() => morphTo(shapes.square), 0.95)
      .add(() => morphTo(LOGO_REGULAR), 1.5)
      .fromTo(q('.intro-axes .hole'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 1.5)
      .fromTo(q('.intro-stamp'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, 1.6)
      .fromTo(q('.intro-cota'), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 1.9)
      .to(fly, { '--glow': 1, duration: 0.2, yoyo: true, repeat: 1 }, 2.1)
      .to(decor, { opacity: 0, duration: 0.3 }, 2.3)
      // O logo engrossa do Regular ao Bold do cabeçalho durante o voo.
      .add(() => morphTo(LOGO_BOLD), 2.4)
      .to(
        fly,
        {
          x: () => flight().x,
          y: () => flight().y,
          scale: () => flight().scale,
          duration: 0.55,
          ease: 'power3.inOut',
        },
        2.4,
      )
      .to(overlay, { opacity: 0, duration: 0.45 }, 2.5)
  })

  return () => {
    stopTicker?.()
    stopTicker = null
    ctx.revert()
    axes.replaceChildren()
    cotaSvg.replaceChildren()
    overlay.querySelector('.intro-stamp')?.remove()
    flyPath.setAttribute('d', 'M60 60')
  }
}
