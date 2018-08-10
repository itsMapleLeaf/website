export const mouse = { x: 0, y: 0 }

window.addEventListener("mousemove", event => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})
