import { useEffect, useRef } from "preact/hooks"
import { raise } from "./helpers"
import { createLeafImage } from "./leaf-image"
import { clamp, distance, lerp, randomRange } from "./math"
import { useWindowEvent } from "./use-window-event"

export function Dots() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resetCanvasSize = () => {
    const canvas = canvasRef.current ?? raise("ref not set")
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
  }
  useEffect(() => resetCanvasSize(), [])
  useWindowEvent("resize", resetCanvasSize)

  const rendererRef = useRef<DotsRenderer>()
  useEffect(() => {
    const canvas = canvasRef.current ?? raise("ref not set")

    let running = true

    const animationFrame = () =>
      new Promise<number>((resolve) => requestAnimationFrame(resolve))

    void (async () => {
      const dotImage = await createLeafImage(dotSize)

      const renderer = (rendererRef.current = new DotsRenderer(
        canvas,
        dotImage,
      ))

      let currentTime = await animationFrame()
      while (running) {
        const nextTime = await animationFrame()
        const delta = (nextTime - currentTime) / 1000
        currentTime = nextTime
        renderer.update(delta)
        renderer.draw()
      }
    })()

    return () => {
      running = false
      rendererRef.current = undefined
    }
  }, [])

  useWindowEvent("deviceorientation", (event) => {
    if (typeof event.gamma === "number" && typeof event.beta === "number") {
      rendererRef.current?.setOrientation(event.gamma, event.beta)
    }
  })

  useWindowEvent("mousemove", (event) => {
    rendererRef.current?.setMouse(event.clientX, event.clientY)
  })

  return (
    <canvas
      class="absolute inset-0 w-screen h-screen opacity-75 pointer-events-none"
      ref={canvasRef}
    />
  )
}

type Dot = {
  x: number
  y: number
  z: number
  opacity: number
}

const dotSize = 40
const dotSpeed = 100
const playfieldPadding = 200
const cursorLightRadius = 800

class DotsRenderer {
  private dots = [] as Dot[]
  private dotOffset = { x: 0, y: 0 }
  private orientation: { x: number; y: number } | undefined
  private mouse = { x: 0, y: 0 }

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly dotImage: HTMLImageElement | HTMLCanvasElement,
  ) {
    const dotCount = Math.max(window.innerWidth, window.innerHeight) * 0.1

    for (let i = 0; i < dotCount; i++) {
      const x = randomRange(-playfieldPadding, canvas.width + playfieldPadding)
      const y = randomRange(-playfieldPadding, canvas.height + playfieldPadding)
      const z = randomRange(0.2, 1)
      this.dots.push({ x, y, z, opacity: 0 })
    }
  }

  setMouse(x: number, y: number) {
    this.mouse = { x, y }
  }

  setOrientation(x: number, y: number) {
    this.orientation = { x, y }
  }

  update(dt: number) {
    this.calculateDotOffset(dt)
    if (dt < 0.5) this.moveDots(dt)
  }

  private calculateDotOffset(dt: number) {
    if (this.orientation) {
      this.dotOffset.x = lerp(this.dotOffset.x, this.orientation.x * 10, dt * 5)
      this.dotOffset.y = lerp(this.dotOffset.y, this.orientation.y * 10, dt * 5)
    } else {
      this.dotOffset.x = lerp(
        this.dotOffset.x,
        ((this.mouse.x - this.canvas.width / 2) / this.canvas.width) * 50,
        dt * 5,
      )
      this.dotOffset.y = lerp(
        this.dotOffset.y,
        ((this.mouse.y - this.canvas.height / 2) / this.canvas.height) * 50,
        dt * 5,
      )
    }
  }

  private moveDots(dt: number) {
    for (const dot of this.dots) {
      dot.y += dotSpeed * dot.z * dt

      if (dot.y > this.canvas.height + playfieldPadding) {
        dot.opacity = Math.max(dot.opacity - dt / 0.5, 0)

        if (dot.opacity <= 0) {
          dot.y -= this.canvas.height + playfieldPadding * 2
        }
      } else {
        dot.opacity = Math.min(dot.opacity + dt / 0.5, 1)
      }
    }
  }

  draw() {
    const context =
      this.canvas.getContext("2d") ?? raise("Canvas context not available")

    context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    for (const dot of this.dots) {
      const rawCursorLightBonus =
        (cursorLightRadius - distance(dot, this.mouse)) / cursorLightRadius

      const cursorLightBonus =
        this.orientation == undefined ? clamp(rawCursorLightBonus, 0.2, 1) : 0.3

      const opacity = dot.opacity * dot.z * cursorLightBonus * 0.8

      const sway = Math.sin((dot.x + dot.y) / 80) * 40
      const tilt = Math.sin((dot.x + dot.y) / 100) * 0.5

      context.save()

      context.shadowColor = `rgba(255, 255, 255, 0.5)`
      context.shadowBlur = 6
      context.globalAlpha = opacity

      context.translate(this.dotImage.width / -2, this.dotImage.height / -2)
      context.translate(
        dot.x + this.dotOffset.x * dot.z + sway,
        dot.y + this.dotOffset.y * dot.z,
      )
      context.scale(dot.z, dot.z)
      context.rotate(tilt)

      context.drawImage(this.dotImage, 0, 0)

      context.restore()
    }
  }
}
