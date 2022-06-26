export function clamp(num: number, min: number, max: number) {
  if (num < min) return min
  if (num > max) return max
  return num
}

export function lerp(a: number, b: number, delta: number) {
  return clamp(delta, 0, 1) * (b - a) + a
}

export function randomRange(min: number, max: number) {
  return lerp(min, max, Math.random())
}

type Point = { x: number; y: number }
export function distance(point: Point, other: Point) {
  return ((other.x - point.x) ** 2 + (other.y - point.y) ** 2) ** 0.5
}
