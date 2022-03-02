import { List, v2 } from "./import.js"
import { Planet } from "./planet.js"

const PI2 = Math.PI * 2

export class Space {
  constructor() {
    this.planetList = new List
    this.center = v2.zero()
    this.scale = 10
  }
  add(planet) {
    if (planet instanceof Planet) this.planetList.push(planet)
  }
  /**
   * @param {number} deltaT
   * @param {CanvasRenderingContext2D} ctx
   */
  update(deltaT, ctx) {
    const scale = this.scale

    this.planetList.each(node => {
      /** @type {Planet} */
      const p = node.value
      p.update(deltaT)
      ctx.beginPath()
      ctx.fillStyle = p.color
      ctx.strokeStyle = p.border
      ctx.arc(p.pos.x * scale, p.pos.y * scale, p.radius * scale, 0, PI2)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
    })
  }
}