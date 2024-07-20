import { search, Loop, v2, random } from "./import.js"
import { Planet } from "./planet.js"
import { RandomHSLColor } from "./randomColor.js"
import { Space } from "./space.js"

/** @type {HTMLCanvasElement} */
const canvas = search.id("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

let width = canvas.width = innerWidth
let height = canvas.height = innerHeight

const space = new Space
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))
space.add(new Planet(v2(width * random() - width / 2, height * random() - height / 2)))

let mass = 10
/** Hold Mouse button for increase mass */
let massplus = false

canvas.addEventListener("contextmenu", (e) => (e.preventDefault()))
canvas.addEventListener("mousedown", () => (massplus = true))
canvas.addEventListener("mouseup", e => {
  e.preventDefault()
  const color = RandomHSLColor()
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
  if (massplus) mass += 5
  ctx.resetTransform()
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height)
  ctx.translate(width / 2, height / 2)
  space.update(deltaT, ctx)
}, { play: true })