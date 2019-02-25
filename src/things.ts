import { queryDom, shuffle } from "./helpers";

const things = shuffle([
  "writing JavaScript",
  "writing TypeScript",
  "writing CSS",
  "writing HTML",
  "working on web apps",
  "CSS-in-JS (don't @ me)",
  "using React",
  "learning new things",
  "getting stuff done",
  "making games",
  "producing music",
  "listening to electronic",
  "mashing keys in rhythm games",
  "eating pizza",
  "following the OSS world",
  "watching anime",
  "helping people on Discord",
  "helping people on Stack Overflow",
  "cute stuff",
])

let currentThing = 1

const thingDisplay = queryDom("#things") as HTMLElement

thingDisplay.style.transition = "300ms"
thingDisplay.textContent = things[0]

function displayNewThing() {
  thingDisplay.style.opacity = "0"
  thingDisplay.style.transform = "translateY(10px)"

  setTimeout(() => {
    thingDisplay.textContent = things[currentThing]
    thingDisplay.style.opacity = "1"
    thingDisplay.style.transform = "translateY(0px)"

    currentThing = (currentThing + 1) % things.length
  }, 500)

  setTimeout(displayNewThing, 3500)
}

displayNewThing()
