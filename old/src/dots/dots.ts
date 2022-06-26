import { loadImage } from "../helpers"
import { canvas } from "./canvas"
import { orientation } from "./device-orientation"
import { clamp, distance, lerp, randomRange } from "./math"
import { mouse } from "./mouse"

type Dot = {
  x: number
  y: number
  z: number
  opacity: number
}

const dots = [] as Dot[]
const dotSize = 40
const dotSpeed = 100
const dotOffset = { x: 0, y: 0 }
const playfieldPadding = 200
const cursorLightRadius = 800

// from https://thenounproject.com/term/maple-leaf/57440/ ♥
const dotImage = document.createElement("canvas")
dotImage.width = dotImage.height = dotSize

// create a new recolored image
loadImage(
  `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMTguOTM5IC05LjQzNyAxMDAgMTAwIiBvdmVyZmxvdz0idmlzaWJsZSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMTguOTM5IC05LjQzNyAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNTkuNDQzLDM2Ljg2NWMtMi40OTQtMS4yODQtMS41MTMtMy4zMjUtMS41MTMtMy4zMjVsMi40MzgtOS45NTljMCwwLTQuNzc5LDEuMTk1LTcuNSwxLjggIGMtMi43MjEsMC42MDQtMi41NjgtMS41MS0yLjU2OC0xLjUxbC0xLjM2MS0zLjQ3OGMwLDAtNS4yODksNy40MDgtNi4wNjUsOC4xNjVjLTAuNzc3LDAuNzU3LTEuNDg4LDEuMjE2LTIuNTQ2LDAuOTEyICBjLTEuMDU4LTAuMzAzLTAuNjAxLTIuMTA5LTAuNjAxLTIuMTA5bDMuMDM3LTE3Ljk3YzAsMCwxLjA4LTEuMTc5LTIuODQ5LDEuNTQzYy0zLjkzLDIuNzIxLTQuNDI0LTEuMTQ0LTQuNDI0LTEuMTQ0bC00LjQzMS05Ljc4N1YwICBsLTQuNjY4LDkuNzkxYzAsMC0wLjY0MywzLjg2NC00LjU3MywxLjE0NGMtMy45MzItMi43MjItMi44OTItMS41NDMtMi44OTItMS41NDNsMy4wMTQsMTcuOTdjMCwwLDAuNDQ2LDEuODA3LTAuNjExLDIuMTA5ICBjLTEuMDU4LDAuMzA0LTEuNzczLTAuMTU1LTIuNTUxLTAuOTEyYy0wLjc3NS0wLjc1Ny02LjA3LTguMTY1LTYuMDctOC4xNjVsLTEuMzU5LDMuNDc4YzAsMCwwLjE1LDIuMTEzLTIuNTcsMS41MSAgYy0yLjcyMi0wLjYwNC03LjUwMS0xLjgtNy41MDEtMS44bDIuNDM4LDkuOTU5YzAsMCwwLjk4MSwyLjA0MS0xLjUxMywzLjMyNXMtMi4xOTEsMS4yODQtMi4xOTEsMS4yODRsMTQuMzYxLDEzLjMwNCAgYzAsMCwxLjQzNiwxLjY2MiwwLjQ1NCw0LjY4NmMtMC45ODMsMy4wMjQtMC41MywyLjk3OS0wLjQ1NCwzLjI4MmMwLjA3NSwwLjMwMywxMS4yNjItMS44NTcsMTMuOTgyLTEuODU3YzAuMjk2LDAsMC43MDUsMCwwLjcwNSwwICB2MThoMS44ODdsMC45MDctMThjMC4zNDIsMCwwLjc5NywwLDEuNDM3LDBjMi43MjIsMCwxMy45MDgsMi4xNiwxMy45ODIsMS44NTdjMC4wNzYtMC4zMDMsMC41My0wLjIyMy0wLjQ1My0zLjI0NyAgYy0wLjk4MS0zLjAyMywwLjQ1My00LjcwMywwLjQ1My00LjcwM2wxNC4zNjEtMTMuMzEyQzYxLjYzNSwzOC4xNTgsNjEuOTM4LDM4LjE0OSw1OS40NDMsMzYuODY1eiI+PC9wYXRoPjwvc3ZnPg==`,
).then((image) => {
  const context = dotImage.getContext("2d")!

  context.drawImage(image, 0, 0, dotImage.width, dotImage.height)

  context.globalCompositeOperation = "source-atop"
  context.fillStyle = "white"
  context.fillRect(0, 0, dotImage.width, dotImage.height)
})

export function generateDots() {
  const dotCount = Math.max(window.innerWidth, window.innerHeight) * 0.1

  for (let i = 0; i < dotCount; i++) {
    const x = randomRange(-playfieldPadding, canvas.width + playfieldPadding)
    const y = randomRange(-playfieldPadding, canvas.height + playfieldPadding)
    const z = randomRange(0.2, 1)
    dots.push({ x, y, z, opacity: 0 })
  }
}

export function calculateDotOffset(dt: number) {
  if (orientation) {
    dotOffset.x = lerp(dotOffset.x, orientation.x * 10, dt * 5)
    dotOffset.y = lerp(dotOffset.y, orientation.y * 10, dt * 5)
  } else {
    dotOffset.x = lerp(
      dotOffset.x,
      ((mouse.x - canvas.width / 2) / canvas.width) * 50,
      dt * 5,
    )
    dotOffset.y = lerp(
      dotOffset.y,
      ((mouse.y - canvas.height / 2) / canvas.height) * 50,
      dt * 5,
    )
  }
}

export function updateDots(dt: number) {
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

export function drawDots(context: CanvasRenderingContext2D) {
  for (const dot of dots) {
    const rawCursorLightBonus =
      (cursorLightRadius - distance(dot, mouse)) / cursorLightRadius

    const cursorLightBonus =
      orientation == null ? clamp(rawCursorLightBonus, 0.2, 1) : 0.3

    const opacity = dot.opacity * dot.z * cursorLightBonus * 0.8

    const sway = Math.sin((dot.x + dot.y) / 80) * 40
    const tilt = Math.sin((dot.x + dot.y) / 100) * 0.5

    context.save()

    context.shadowColor = `rgba(255, 255, 255, 0.5)`
    context.shadowBlur = 6
    context.globalAlpha = opacity

    context.translate(dotImage.width / -2, dotImage.height / -2)
    context.translate(
      dot.x + dotOffset.x * dot.z + sway,
      dot.y + dotOffset.y * dot.z,
    )
    context.scale(dot.z, dot.z)
    context.rotate(tilt)

    context.drawImage(dotImage, 0, 0)

    context.restore()
  }
}

generateDots()
