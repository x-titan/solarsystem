import { search, Loop, v2 } from "./import.js"
import { Planet } from "./planet.js"
import { Space } from "./space.js"

/** @type {HTMLCanvasElement} */
const canvas = search.id("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
let always = v2.zero()

const colors = [
  "red", "yellow", "green", "blue", "purple"
]
const space = new Space
space.add(new Planet(v2(innerWidth * Math.random() - innerWidth / 2, innerHeight * Math.random() - innerHeight / 2)))
space.add(new Planet(v2(innerWidth * Math.random() - innerWidth / 2, innerHeight * Math.random() - innerHeight / 2)))
space.add(new Planet(v2(innerWidth * Math.random() - innerWidth / 2, innerHeight * Math.random() - innerHeight / 2)))

canvas.addEventListener("click", e => {
  e.preventDefault()
  always.x = e.clientX
  always.y = e.clientY
  const radius = Math.random() * 4 + 0.5
  const mass = Math.random() * 10
  const color = colors[Math.floor(Math.random() * colors.length)]
  space.add(new Planet(
    v2(e.clientX - innerWidth / 2,
      e.clientY - innerHeight / 2),
    {
      color,
      mass,
      radius
    }
  ))
})
new Loop((deltaT = 0) => {
  const width = canvas.width = innerWidth
  const height = canvas.height = innerHeight
  ctx.resetTransform()
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height)
  ctx.fillRect(always.x, always.y, 20, 20)
  ctx.translate(
    space.center.x = width / 2,
    space.center.y = height / 2)
  space.update(deltaT, ctx)
}, { play: true })