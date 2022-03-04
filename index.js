import { search, Loop, v2 } from "./import.js"
import { Planet } from "./planet.js"
import { Space } from "./space.js"

/** @type {HTMLCanvasElement} */
const canvas = search.id("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
const { random, floor } = Math
let width = canvas.width = innerWidth
let height = canvas.height = innerHeight
const colors = [
  "red", "yellow", "green", "blue", "purple", "white", "deeppink"
]
const space = new Space
space.add(
  new Planet(
    v2(0, 0),
    {
      mass: 9 * (10 ** 2),
      color: "gold",
      notMove: true
    }
  )
)
// space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))


let mass = 10
let massplus = false

canvas.addEventListener("mousedown", e => {
  massplus = true
})
canvas.addEventListener("click", e => {
  e.preventDefault()
  const color = colors[floor(random() * colors.length)]
  space.add(new Planet(
    v2(e.clientX - width / 2,
      e.clientY - height / 2),
    {
      color,
      mass
    }
  ))
  massplus = false
  mass = 10
})
globalThis.addEventListener("resize", () => {
  width = canvas.width = innerWidth
  height = canvas.height = innerHeight
})
new Loop((deltaT = 0) => {
  if (massplus) mass+=5
  ctx.resetTransform()
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height)
  ctx.translate(width / 2, height / 2)
  space.update(deltaT, ctx)
}, { play: true })