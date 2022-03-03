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
      mass: 9 * (10 ** 3),
      color: "gold",
      radius: 50, notMove: true
    }
  )
)
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))

canvas.addEventListener("click", e => {
  e.preventDefault()
  const radius = random() * 4 + 10
  const mass = random() * 1000
  const color = colors[floor(random() * colors.length)]
  space.add(new Planet(
    v2(e.clientX - width / 2,
      e.clientY - height / 2),
    {
      color,
      mass,
      radius
    }
  ))
})
globalThis.addEventListener("resize",()=> {

  width = canvas.width = innerWidth
   height = canvas.height = innerHeight
})
new Loop((deltaT = 0) => {
  ctx.resetTransform()
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height)
  ctx.translate(width / 2, height / 2)
  space.update(deltaT, ctx)
}, { play: true })