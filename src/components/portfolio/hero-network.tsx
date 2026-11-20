'use client'

import { useEffect, useRef } from 'react'

import { LOW_MEMORY_GB, lowMotionReason, readMotionSignals } from '@/lib/motion/capability'
import { networkNodeCount } from '@/lib/motion/network'
import { subscribePointerField } from '@/lib/motion/pointer-field'

interface NetNode {
  x: number
  y: number
  vx: number
  vy: number
}

const LINK_DISTANCE = 92
const CURSOR_DISTANCE = 140

/**
 * Rede de nós no fundo do Hero, desenhada em canvas. O loop é próprio (o do
 * cursor para ao convergir) e só roda com o Hero à vista e a aba visível. Sem
 * movimento ou em toque, desenha um quadro estático e não escuta o cursor.
 */
export function HeroNetwork() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const still =
      lowMotionReason(readMotionSignals(), LOW_MEMORY_GB) !== null ||
      window.matchMedia('(hover: none), (pointer: coarse)').matches
    // O token é lido uma vez; a opacidade de cada traço vai por globalAlpha.
    const color = getComputedStyle(canvas).getPropertyValue('--primary').trim()

    let nodes: NetNode[] = []
    let width = 0
    let height = 0
    let dpr = 1
    let pointer: { x: number; y: number } | null = null
    let visible = typeof IntersectionObserver === 'undefined'
    let raf = 0

    function size() {
      if (!canvas || !ctx) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      nodes = Array.from({ length: networkNodeCount(width, height) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }))
      draw(false)
    }

    function draw(move: boolean) {
      if (!canvas || !ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)
      if (color) {
        ctx.fillStyle = color
        ctx.strokeStyle = color
      }
      ctx.lineWidth = 1

      let mx = -1e4
      let my = -1e4
      if (pointer) {
        const rect = canvas.getBoundingClientRect()
        mx = pointer.x - rect.left
        my = pointer.y - rect.top
      }

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (move) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < 0 || n.x > width) n.vx *= -1
          if (n.y < 0 || n.y > height) n.vy *= -1
        }
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j]
          const d = Math.hypot(n.x - m.x, n.y - m.y)
          if (d < LINK_DISTANCE) {
            ctx.globalAlpha = 0.22 * (1 - d / LINK_DISTANCE)
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.stroke()
          }
        }
        const dc = Math.hypot(n.x - mx, n.y - my)
        const near = dc < CURSOR_DISTANCE
        ctx.globalAlpha = near ? 0.95 : 0.35
        ctx.beginPath()
        ctx.arc(n.x, n.y, near ? 2.2 : 1.4, 0, Math.PI * 2)
        ctx.fill()
        if (near) {
          ctx.globalAlpha = 0.45 * (1 - dc / CURSOR_DISTANCE)
          ctx.beginPath()
          ctx.moveTo(n.x, n.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }
      ctx.globalAlpha = 1
    }

    const resize = new ResizeObserver(size)
    resize.observe(canvas)
    if (still) {
      return () => resize.disconnect()
    }

    function tick() {
      raf = requestAnimationFrame(tick)
      draw(true)
    }

    // Roda só com o Hero à vista e a aba visível; fora disso o loop para de verdade.
    function sync() {
      const run = visible && !document.hidden
      if (run && !raf) raf = requestAnimationFrame(tick)
      else if (!run && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const intersection =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver((entries) => {
            visible = entries[entries.length - 1].isIntersecting
            sync()
          })
    intersection?.observe(canvas)
    document.addEventListener('visibilitychange', sync)
    // O primeiro frame é o ponto de repouso, não um cursor: sem ignorá-lo, os
    // nós se ligariam a um "mouse" que ninguém mexeu.
    let firstFrame = true
    const unsubscribe = subscribePointerField(({ x, y }) => {
      if (firstFrame) {
        firstFrame = false
        return
      }
      pointer = { x, y }
    })
    sync()

    return () => {
      cancelAnimationFrame(raf)
      raf = 0
      unsubscribe()
      document.removeEventListener('visibilitychange', sync)
      intersection?.disconnect()
      resize.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="hero-network" aria-hidden="true" />
}
