type Point = { x: number; y: number }
export let orientation: Point | void

window.addEventListener("deviceorientation", (event) => {
  if (typeof event.gamma === "number" && typeof event.beta === "number") {
    orientation = {
      x: event.gamma,
      y: event.beta,
    }
  }
})
