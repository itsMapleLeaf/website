const canvas = document.querySelector("canvas")
canvas.style.width = "100vw"
canvas.style.height = "100vh"
canvas.style.position = "absolute"

function clamp(num, min, max) {
  if (num < min) return min
  if (num > max) return max
  return num
}

function lerp(a, b, delta) {
  return clamp(delta, 0, 1) * (b - a) + a
}

function randomRange(min, max) {
  return lerp(min, max, Math.random())
}

function resetCanvasSize() {
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width
  canvas.height = rect.height
}

const mouse = { x: 0, y: 0 }

window.addEventListener("mousemove", event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

let orientation

window.addEventListener("deviceorientation", event => {
  orientation = {
    x: event.gamma,
    y: event.beta,
  }
})

const dots = []
const dotSize = 8
const dotSpeed = 100
const dotOffset = { x: 0, y: 0 }
const playfieldPadding = 200

function generateDots() {
  for (let i = 0; i < 100; i++) {
    const x = randomRange(-playfieldPadding, canvas.width + playfieldPadding)
    const y = randomRange(-playfieldPadding, canvas.height + playfieldPadding)
    const z = randomRange(0.2, 1)
    dots.push({ x, y, z, opacity: 0 })
  }
}

function updateDots(dt) {
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

function calculateDotOffset(dt) {
  if (orientation) {
    dotOffset.x = lerp(dotOffset.x, orientation.x * 10, dt * 5)
    dotOffset.y = lerp(dotOffset.y, orientation.y * 10, dt * 5)
  } else {
    dotOffset.x = lerp(dotOffset.x, (mouse.x - canvas.width / 2) / canvas.width * 50, dt * 5)
    dotOffset.y = lerp(dotOffset.y, (mouse.y - canvas.height / 2) / canvas.height * 50, dt * 5)
  }
}

function drawDots(context) {
  for (const dot of dots) {
    context.fillStyle = `hsla(224, 73%, 97%, ${dot.opacity * dot.z * 0.2})`
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

function update(dt) {
  updateDots(dt)
  calculateDotOffset(dt)
}

function draw() {
  const context = canvas.getContext("2d")
  context.clearRect(0, 0, context.canvas.width, context.canvas.height)

  drawDots(context)

  // if (orientation) {
  //   context.fillStyle = "white"
  //   context.fillText(`${orientation.x}, ${orientation.y}`, 10, 10)
  // }
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
