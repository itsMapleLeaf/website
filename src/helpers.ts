// https://stackoverflow.com/a/6274381/1332403
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  let j, x, i
  for (i = result.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = result[i]
    result[i] = result[j]
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
