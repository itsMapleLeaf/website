// https://stackoverflow.com/a/6274381/1332403
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  let j, x, i
  for (i = result.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = result[i]
    // @ts-expect-error
    result[i] = result[j]
    // @ts-expect-error
    result[j] = x
  }
  return result
}

export function queryDom(selector: string) {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Couldn't find element with selector "${selector}"`)
  }
  return element
}

export function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.addEventListener("load", () => resolve(image))
    image.addEventListener("error", () =>
      reject(new Error("Failed to load image")),
    )
  })
}

export function toError(error: unknown) {
  return error instanceof Error ? error : new Error(String(error))
}

export function raise(error: unknown): never {
  throw toError(error)
}
