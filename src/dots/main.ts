import { canvas } from "./canvas"
import { calculateDotOffset, drawDots, updateDots } from "./dots"

function update(dt: number) {
  updateDots(dt)
  calculateDotOffset(dt)
}

function draw() {
  const context = canvas.getContext("2d")!
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  drawDots(context)

  // if (orientation) {
  //   context.fillStyle = "white"
  //   context.fillText(`${orientation.x}, ${orientation.y}`, 10, 10)
  // }
}

let lastTime: number | void
export function runDots(frameTime: number) {
  const delta = frameTime - (lastTime || frameTime)
  lastTime = frameTime

  update(delta / 1000)
  draw()
  requestAnimationFrame(runDots)
}

requestAnimationFrame(runDots)
