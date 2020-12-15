import { queryDom } from "../helpers"

export const canvas = queryDom("canvas") as HTMLCanvasElement

export function resetCanvasSize() {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
}

resetCanvasSize()
window.addEventListener("resize", resetCanvasSize, { passive: true })
