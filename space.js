import { List, v2, AVector } from "./import.js"
import { Planet } from "./planet.js"

const G = 6.67430 * (10 ** -1)
const PI2 = Math.PI * 2
const { PI, atan2, sqrt } = Math

export class Space {
  constructor() {
    this.planetList = new List
    this.center = v2.zero()
    this.scale = 10
  }
  add(planet) {
    if (planet instanceof Planet) {
      planet.pos.div(this.scale)
      this.planetList.push(planet)
    }
    return this
  }
  /**
   * @param {number} deltaT
   * @param {CanvasRenderingContext2D} ctx
   */
  update(deltaT, ctx) {
    const scale = this.scale
    this.planetList.each(node => node.value.force.clear())
    this.planetList.each(node => {
      /** @type {Planet} */
      const p = node.value
      const pos = p.pos
      ctx.beginPath()
      ctx.fillStyle = p.color
      ctx.strokeStyle = p.border
      ctx.lineWidth = 1
      ctx.arc(
        p.pos.x * scale,
        p.pos.y * scale,
        p.radius * scale,
        0, PI2)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()

      this.planetList.each(node_ => {
        /** @type {Planet} */
        const p2 = node_.value
        if (p !== p2) {
          const pos2 = p2.pos
          const dx = pos2.x - pos.x
          const dy = pos2.y - pos.y
          const distance = sqrt(dx ** 2 + dy ** 2) || 1
          const F = 10 * p.mass * p2.mass / (distance ** 2)
          const fx = F * dx / distance
          const fy = F * dy / distance
          p.force.x += fx
          p.force.y += fy
          p2.force.x -= fx
          p2.force.y -= fy
        }
      })
    })
    this.planetList.each(node => node.value.update(deltaT))
  }
}