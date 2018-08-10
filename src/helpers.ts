// https://stackoverflow.com/a/6274381/1332403
export function shuffle(array: any[]) {
  var j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
}

export function queryDom(selector: string) {
  const element = document.querySelector(selector)
  if (!element) {
    throw new Error(`Couldn't find element with selector "${selector}"`)
  }
  return element
}