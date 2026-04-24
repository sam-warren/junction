import { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * Particles Component Props
 *
 * @param {string} [className] - Additional CSS classes applied to the wrapper
 * @param {number} [quantity=100] - Number of particles to render
 * @param {number} [staticity=50] - How "anchored" particles are to their home position vs. floating with the cursor
 * @param {number} [ease=50] - Cursor interaction smoothing (higher = lazier)
 * @param {number} [size=0.4] - Base particle radius
 * @param {boolean} [refresh=false] - Toggling this forces the field to re-initialize
 * @param {string} [color="#ffffff"] - Particle color, accepts any CSS color
 * @param {number} [vx=0] - Horizontal drift velocity
 * @param {number} [vy=0] - Vertical drift velocity
 */
export interface ParticlesProps {
  className?: string
  quantity?: number
  staticity?: number
  ease?: number
  size?: number
  refresh?: boolean
  color?: string
  vx?: number
  vy?: number
}

type Circle = {
  x: number
  y: number
  translateX: number
  translateY: number
  size: number
  alpha: number
  targetAlpha: number
  dx: number
  dy: number
  magnetism: number
}

function hexToRgb(hex: string): [number, number, number] {
  // Accepts #rgb, #rrggbb, or any CSS color via the canvas parser fallback.
  const shorthand = /^#([a-f\d])([a-f\d])([a-f\d])$/i
  const full = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

  let normalized = hex.trim()
  const shortMatch = shorthand.exec(normalized)
  if (shortMatch) {
    normalized = `#${shortMatch[1]}${shortMatch[1]}${shortMatch[2]}${shortMatch[2]}${shortMatch[3]}${shortMatch[3]}`
  }

  const fullMatch = full.exec(normalized)
  if (fullMatch) {
    return [
      parseInt(fullMatch[1], 16),
      parseInt(fullMatch[2], 16),
      parseInt(fullMatch[3], 16),
    ]
  }

  // Fallback: let the canvas parse arbitrary CSS colors (e.g. "rgb(...)", "hsl(...)", named colors)
  if (typeof document !== "undefined") {
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.fillStyle = normalized
      ctx.fillRect(0, 0, 1, 1)
      const data = ctx.getImageData(0, 0, 1, 1).data
      return [data[0], data[1], data[2]]
    }
  }

  return [255, 255, 255]
}

function remapValue(
  value: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
): number {
  const remapped =
    ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
  return remapped > 0 ? remapped : 0
}

/**
 * Particles
 *
 * Canvas-based animated particle field. Renders drifting dots on a transparent
 * canvas with optional cursor interaction. Retina-ready via devicePixelRatio.
 * Respects prefers-reduced-motion by rendering the field statically.
 */
export function Particles({
  className,
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
}: ParticlesProps) {
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<Circle[]>([])
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const rafId = useRef<number | null>(null)
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1

  const rgb = useRef<[number, number, number]>([255, 255, 255])

  useEffect(() => {
    rgb.current = hexToRgb(color)
  }, [color])

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w)
    const y = Math.floor(Math.random() * canvasSize.current.h)
    const translateX = 0
    const translateY = 0
    const pSize = Math.floor(Math.random() * 2) + size
    const alpha = 0
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
    const dx = (Math.random() - 0.5) * 0.1
    const dy = (Math.random() - 0.5) * 0.1
    const magnetism = 0.1 + Math.random() * 4
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    }
  }, [size])

  const clearContext = useCallback(() => {
    if (contextRef.current) {
      contextRef.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      )
    }
  }, [])

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      if (contextRef.current) {
        const { x, y, translateX, translateY, size: pSize, alpha } = circle
        contextRef.current.translate(translateX, translateY)
        contextRef.current.beginPath()
        contextRef.current.arc(x, y, pSize, 0, 2 * Math.PI)
        contextRef.current.fillStyle = `rgba(${rgb.current.join(", ")}, ${alpha})`
        contextRef.current.fill()
        contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0)

        if (!update) {
          circles.current.push(circle)
        }
      }
    },
    [dpr]
  )

  const drawParticles = useCallback(() => {
    clearContext()
    const particleCount = quantity
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams()
      drawCircle(circle)
    }
  }, [quantity, circleParams, drawCircle, clearContext])

  const resizeCanvas = useCallback(() => {
    if (
      canvasContainerRef.current &&
      canvasRef.current &&
      contextRef.current
    ) {
      circles.current.length = 0
      canvasSize.current.w = canvasContainerRef.current.offsetWidth
      canvasSize.current.h = canvasContainerRef.current.offsetHeight
      canvasRef.current.width = canvasSize.current.w * dpr
      canvasRef.current.height = canvasSize.current.h * dpr
      canvasRef.current.style.width = `${canvasSize.current.w}px`
      canvasRef.current.style.height = `${canvasSize.current.h}px`
      contextRef.current.scale(dpr, dpr)
    }
  }, [dpr])

  const initCanvas = useCallback(() => {
    resizeCanvas()
    drawParticles()
  }, [resizeCanvas, drawParticles])

  const animate = useCallback(() => {
    clearContext()
    circles.current.forEach((circle: Circle, i: number) => {
      // Edge proximity determines target alpha fade near borders
      const edge = [
        circle.x + circle.translateX - circle.size, // left
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // right
        circle.y + circle.translateY - circle.size, // top
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // bottom
      ]
      const closestEdge = edge.reduce((a, b) => Math.min(a, b))
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      )
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge
      }
      circle.x += circle.dx + vx
      circle.y += circle.dy + vy
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease

      drawCircle(circle, true)

      // Recycle particles that drift off-screen
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1)
        const newCircle = circleParams()
        drawCircle(newCircle)
      }
    })
    rafId.current = window.requestAnimationFrame(animate)
  }, [clearContext, drawCircle, circleParams, ease, staticity, vx, vy])

  // Init + observe resize + cursor tracking
  useEffect(() => {
    const container = canvasContainerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    contextRef.current = canvas.getContext("2d")
    initCanvas()

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (!prefersReducedMotion) {
      animate()
    }

    const resizeObserver = new ResizeObserver(() => {
      initCanvas()
    })
    resizeObserver.observe(container)

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2
      const inside =
        x < rect.width / 2 &&
        x > -rect.width / 2 &&
        y < rect.height / 2 &&
        y > -rect.height / 2
      if (inside) {
        mouse.current.x = x
        mouse.current.y = y
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current != null) {
        window.cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [initCanvas, animate])

  // Re-initialize when `refresh` toggles or quantity/color change
  useEffect(() => {
    initCanvas()
  }, [refresh, initCanvas])

  return (
    <div
      ref={canvasContainerRef}
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}

export default Particles
