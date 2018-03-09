// @ts-check
import { randomRange, lerp, distance, clamp } from "./math"
import { canvas } from "./canvas"
import { mouse } from "./mouse"
import { orientation } from "./device-orientation"

const dots = []
const dotSize = 8
const dotSpeed = 100
const dotOffset = { x: 0, y: 0 }
const playfieldPadding = 200
const cursorLightRadius = 800

export function generateDots() {
  const dotCount = Math.max(window.innerWidth, window.innerHeight) * 0.1

  for (let i = 0; i < dotCount; i++) {
    const x = randomRange(-playfieldPadding, canvas.width + playfieldPadding)
    const y = randomRange(-playfieldPadding, canvas.height + playfieldPadding)
    const z = randomRange(0.2, 1)
    dots.push({ x, y, z, opacity: 0 })
  }
}

export function calculateDotOffset(dt) {
  if (orientation) {
    dotOffset.x = lerp(dotOffset.x, orientation.x * 10, dt * 5)
    dotOffset.y = lerp(dotOffset.y, orientation.y * 10, dt * 5)
  } else {
    dotOffset.x = lerp(dotOffset.x, (mouse.x - canvas.width / 2) / canvas.width * 50, dt * 5)
    dotOffset.y = lerp(dotOffset.y, (mouse.y - canvas.height / 2) / canvas.height * 50, dt * 5)
  }
}

export function updateDots(dt) {
  if (dt > 0.5) return

  for (const dot of dots) {
    dot.y += dotSpeed * dot.z * dt

    if (dot.y > canvas.height + playfieldPadding) {
      dot.opacity = Math.max(dot.opacity - dt / 0.5, 0)

      if (dot.opacity <= 0) {
        dot.y -= canvas.height + playfieldPadding * 2
      }
    } else {
      dot.opacity = Math.min(dot.opacity + dt / 0.5, 1)
    }
  }
}

export function drawDots(context) {
  const flicker = lerp(0.7, 1, Math.random())

  for (const dot of dots) {
    const cursorLightBonus =
      orientation == null
        ? clamp((cursorLightRadius - distance(dot, mouse)) / cursorLightRadius, 0.2, 1)
        : 0.3

    const opacity = dot.opacity * dot.z * cursorLightBonus * flicker * 0.8

    context.fillStyle = `hsla(224, 73%, 97%, ${opacity})`
    context.beginPath()
    context.arc(
      dot.x + dotOffset.x * dot.z,
      dot.y + dotOffset.y * dot.z,
      dotSize * dot.z,
      0,
      Math.PI * 2,
    )
    context.fill()
  }
}

generateDots()
