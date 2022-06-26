import { useEffect, useState } from "preact/hooks"
import { shuffle, sleep } from "./helpers"

const likes = shuffle([
  "writing JavaScript",
  "writing TypeScript",
  "writing CSS",
  "writing HTML",
  "working on web apps",
  "using React",
  "using Next.js",
  "using Remix",
  "using Astro",
  "using TailwindCSS",
  "learning new things",
  "making games",
  "producing music",
  "electronic music",
  "rhythm games",
  "eating pizza",
  "following cool stuff in OSS",
  "watching anime",
  "helping people on Discord",
  "cute stuff",
  "accessibility",
])

export function Likes() {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    void (async () => {
      while (true) {
        setVisible(true)
        await sleep(3000)
        setVisible(false)
        await sleep(500)
        setIndex((index) => index + 1)
        await sleep(500)
      }
    })()
  }, [])

  return (
    <p class="grid gap-1 text-2xl font-condensed sm:grid-flow-col auto-cols-max">
      <span class="opacity-50">i like</span>{" "}
      <span
        class={`inline-block transition ${
          visible ? "ease-out opacity-100" : "ease-in translate-y-2 opacity-0"
        }`}
      >
        {likes[index % likes.length]}
      </span>
    </p>
  )
}
