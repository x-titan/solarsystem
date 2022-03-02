import { search, Loop } from "./import.js"
import { Planet } from "./planet.js"
import { Space } from "./space.js"

/** @type {HTMLCanvasElement} */
const canvas = search.id("canvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")

const space = new Space
space.add(new Planet)

new Loop((deltaT = 0) => {
  const width = canvas.width = innerWidth
  const height = canvas.height = innerHeight
  ctx.resetTransform()
  ctx.fillStyle = "black"
  ctx.fillRect(0, 0, width, height)
  ctx.translate(
    space.center.x = width / 2,
    space.center.y = height / 2)
  space.update(deltaT, ctx)

}, { play: true })