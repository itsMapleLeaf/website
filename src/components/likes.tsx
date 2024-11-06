import { useEffect, useState } from "preact/hooks"
import { shuffle, sleep } from "../helpers/common.ts"

const likes = shuffle([
  "working with the Astro team 💜",
  "using TypeScript",
  "using Convex",
  "using Godot",
  "using Gleam",
  "using Rust (sometimes)",
  "using Go",
  "using Deno",
  "writing CSS",
  "writing HTML",
  "working on web apps",
  "using React",
  "using Remix",
  "using Astro",
  "using TailwindCSS",
  "learning new things",
  "making games",
  "producing music",
  "electronic music",
  "rhythm games",
  "tasty fruit",
  "following cool stuff in OSS",
  "watching anime",
  "cute things",
  "accessibility",
])

export function Likes() {
  const [visible, setVisible] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let running = true

    void (async () => {
      while (running) {
        await sleep(3000)
        setVisible(false)
        await sleep(500)
        setIndex((index) => index + 1)
        await sleep(500)
        setVisible(true)
      }
    })()

    return () => {
      running = false
    }
  }, [])

  return (
    <p class="grid auto-cols-max gap-1 font-condensed text-2xl sm:grid-flow-col">
      <span class="opacity-50">i like</span>{" "}
      <span
        class={`inline-block transition ${
          visible ? "opacity-100 ease-out" : "translate-y-2 opacity-0 ease-in"
        }`}
      >
        {likes[index % likes.length]}
      </span>
    </p>
  )
}
