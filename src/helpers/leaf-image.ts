import { loadImage } from "./common.ts"

export async function createLeafImage(size: number) {
  const sourceImage = await loadImage(
    // from https://thenounproject.com/term/maple-leaf/57440/ ♥
    `data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczphPSJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlU1ZHVmlld2VyRXh0ZW5zaW9ucy8zLjAvIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSItMTguOTM5IC05LjQzNyAxMDAgMTAwIiBvdmVyZmxvdz0idmlzaWJsZSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMTguOTM5IC05LjQzNyAxMDAgMTAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNNTkuNDQzLDM2Ljg2NWMtMi40OTQtMS4yODQtMS41MTMtMy4zMjUtMS41MTMtMy4zMjVsMi40MzgtOS45NTljMCwwLTQuNzc5LDEuMTk1LTcuNSwxLjggIGMtMi43MjEsMC42MDQtMi41NjgtMS41MS0yLjU2OC0xLjUxbC0xLjM2MS0zLjQ3OGMwLDAtNS4yODksNy40MDgtNi4wNjUsOC4xNjVjLTAuNzc3LDAuNzU3LTEuNDg4LDEuMjE2LTIuNTQ2LDAuOTEyICBjLTEuMDU4LTAuMzAzLTAuNjAxLTIuMTA5LTAuNjAxLTIuMTA5bDMuMDM3LTE3Ljk3YzAsMCwxLjA4LTEuMTc5LTIuODQ5LDEuNTQzYy0zLjkzLDIuNzIxLTQuNDI0LTEuMTQ0LTQuNDI0LTEuMTQ0bC00LjQzMS05Ljc4N1YwICBsLTQuNjY4LDkuNzkxYzAsMC0wLjY0MywzLjg2NC00LjU3MywxLjE0NGMtMy45MzItMi43MjItMi44OTItMS41NDMtMi44OTItMS41NDNsMy4wMTQsMTcuOTdjMCwwLDAuNDQ2LDEuODA3LTAuNjExLDIuMTA5ICBjLTEuMDU4LDAuMzA0LTEuNzczLTAuMTU1LTIuNTUxLTAuOTEyYy0wLjc3NS0wLjc1Ny02LjA3LTguMTY1LTYuMDctOC4xNjVsLTEuMzU5LDMuNDc4YzAsMCwwLjE1LDIuMTEzLTIuNTcsMS41MSAgYy0yLjcyMi0wLjYwNC03LjUwMS0xLjgtNy41MDEtMS44bDIuNDM4LDkuOTU5YzAsMCwwLjk4MSwyLjA0MS0xLjUxMywzLjMyNXMtMi4xOTEsMS4yODQtMi4xOTEsMS4yODRsMTQuMzYxLDEzLjMwNCAgYzAsMCwxLjQzNiwxLjY2MiwwLjQ1NCw0LjY4NmMtMC45ODMsMy4wMjQtMC41MywyLjk3OS0wLjQ1NCwzLjI4MmMwLjA3NSwwLjMwMywxMS4yNjItMS44NTcsMTMuOTgyLTEuODU3YzAuMjk2LDAsMC43MDUsMCwwLjcwNSwwICB2MThoMS44ODdsMC45MDctMThjMC4zNDIsMCwwLjc5NywwLDEuNDM3LDBjMi43MjIsMCwxMy45MDgsMi4xNiwxMy45ODIsMS44NTdjMC4wNzYtMC4zMDMsMC41My0wLjIyMy0wLjQ1My0zLjI0NyAgYy0wLjk4MS0zLjAyMywwLjQ1My00LjcwMywwLjQ1My00LjcwM2wxNC4zNjEtMTMuMzEyQzYxLjYzNSwzOC4xNTgsNjEuOTM4LDM4LjE0OSw1OS40NDMsMzYuODY1eiI+PC9wYXRoPjwvc3ZnPg==`,
  )

  // create a new recolored image
  const image = document.createElement("canvas")
  image.width = image.height = size

  const context = image.getContext("2d")
  if (!context) {
    throw new Error("Could not create context")
  }

  context.drawImage(sourceImage, 0, 0, image.width, image.height)

  context.globalCompositeOperation = "source-atop"
  context.fillStyle = "white"
  context.fillRect(0, 0, image.width, image.height)

  return image
}
