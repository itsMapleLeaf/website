import { queryDom, shuffle, sleep } from "./helpers"

const likes = shuffle([
  "writing JavaScript",
  "writing TypeScript",
  "writing CSS",
  "writing HTML",
  "working on web apps",
  "using React",
  "using Next.js",
  "using TailwindCSS",
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
  "accessibility",
])

async function transitionLikes() {
  let currentLike = 1

  const likesDisplay = queryDom("#likes") as HTMLElement

  likesDisplay.style.transition = "300ms"
  likesDisplay.textContent = likes[0]

  while (true) {
    likesDisplay.style.opacity = "0"
    likesDisplay.style.transform = "translateY(10px)"

    await sleep(500)

    likesDisplay.textContent = likes[currentLike]
    likesDisplay.style.opacity = "1"
    likesDisplay.style.transform = "translateY(0px)"

    currentLike = (currentLike + 1) % likes.length

    await sleep(3000)
  }
}

transitionLikes().catch(console.error)
