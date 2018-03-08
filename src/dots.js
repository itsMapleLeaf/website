const canvas = document.querySelector("canvas")
canvas.style.width = "100vw"
canvas.style.height = "100vh"
canvas.style.position = "absolute"

function randomRange(min, max) {
  return Math.random() * (max - min) + min
}

function resetCanvasSize() {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
}

const dots = []
const dotSize = 8
const dotSpeed = 100

function generateDots() {
  for (let i = 0; i < 100; i++) {
    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const z = randomRange(0.2, 1)
    dots.push({ x, y, z })
  }
}

function moveDots(dt) {
  for (const dot of dots) {
    dot.y += dotSpeed * dot.z * dt
    if (dot.y > canvas.height + 10) {
      dot.y -= canvas.height + 20
    }
  }
}

function drawDots(context) {
  context.fillStyle = "hsla(224, 73%, 97%, 0.2)"
  for (const dot of dots) {
    context.beginPath()
    context.arc(dot.x, dot.y, dotSize * dot.z, 0, Math.PI * 2)
    context.fill()
  }
}

function update(dt) {
  moveDots(dt)
}

function draw() {
  const context = canvas.getContext("2d")
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  drawDots(context)
}

let lastTime
function run(frameTime) {
  const delta = frameTime - (lastTime || frameTime)
  lastTime = frameTime

  update(delta / 1000)
  draw()
  requestAnimationFrame(run)
}

resetCanvasSize()
window.addEventListener("resize", resetCanvasSize, { passive: true })

generateDots()
requestAnimationFrame(run)
