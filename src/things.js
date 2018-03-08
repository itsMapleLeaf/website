import { shuffle } from "./helpers"

const things = [
  "write JavaScript",
  "write TypeScript",
  "write CSS",
  "write HTML",
  "write Lua",
  "use React",
  "use Vue",
  "learn new things",
  "get stuff done",
  "solve problems",
  "make games",
  "mash keys in rhythm games",
  "eat pizza",
  "contribute to OSS",
  "watch anime",
  "help people on Discord",
  "help people on Stack Overflow",
]

let currentThing = 0

const thingDisplay = document.getElementById("things")
thingDisplay.style.transition = "300ms"

function displayNewThing() {
  thingDisplay.style.opacity = 0
  thingDisplay.style.transform = "translateY(10px)"

  setTimeout(() => {
    thingDisplay.textContent = things[currentThing]
    thingDisplay.style.opacity = 1
    thingDisplay.style.transform = "translateY(0px)"

    currentThing = (currentThing + 1) % things.length
  }, 500)

  setTimeout(displayNewThing, 3500)
}

shuffle(things)
displayNewThing()