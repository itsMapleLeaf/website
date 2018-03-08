export let orientation

window.addEventListener("deviceorientation", event => {
  if (typeof event.gamma === "number" && typeof event.beta === "number") {
    orientation = {
      x: event.gamma,
      y: event.beta,
    }
  }
})
