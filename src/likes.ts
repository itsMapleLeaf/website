import { queryDom, shuffle } from "./helpers"

const likes = shuffle([
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

let currentLike = 1

const likesDisplay = queryDom("#likes") as HTMLElement

likesDisplay.style.transition = "300ms"
likesDisplay.textContent = likes[0]

function displayNewLike() {
  likesDisplay.style.opacity = "0"
  likesDisplay.style.transform = "translateY(10px)"

  setTimeout(() => {
    likesDisplay.textContent = likes[currentLike]
    likesDisplay.style.opacity = "1"
    likesDisplay.style.transform = "translateY(0px)"

    currentLike = (currentLike + 1) % likes.length
  }, 500)

  setTimeout(displayNewLike, 3500)
}

displayNewLike()
