import { List, v2, AVector } from "./import.js"
import { Planet } from "./planet.js"

const G = 6.67430 * (10 * -5)
const PI2 = Math.PI * 2
const { PI, atan2, sqrt, cos, sin } = Math
function rotate(vel, angle) {
  return v2(
    vel.x * cos(angle) - vel.y * sin(angle),
    vel.x * sin(angle) + vel.y * cos(angle)
  )
}
function collision(p1, p2) {
  const pos1 = p1.pos, pos2 = p2.pos
  const vdx = p1.vel.x - p2.vel.x
  const vdy = p1.vel.y - p2.vel.y
  const dx = pos2.x - pos1.x
  const dy = pos2.y - pos1.y
  if (vdx * dx + vdy * dy >= 0) {
    const angle = -atan2(pos2.y - pos1.y, pos2.x - pos1.x)
    const m1 = p1.mass;
    const m2 = p2.mass;
    const u1 = rotate(p1.vel, angle)
    const u2 = rotate(p2.vel, angle)
    const vec1 = v2(u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), u1.y)
    const vec2 = v2(u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), u2.y)
    const res1 = rotate(vec1, -angle)
    const res2 = rotate(vec2, -angle)
    p1.vel.x = res1.x
    p1.vel.y = res1.y
    p2.vel.x = res2.x
    p2.vel.y = res2.y
  }
}
export class Space {
  constructor() {
    this.planetList = new List
    this.center = v2.zero()
  }
  add(planet) {
    if (planet instanceof Planet) {
      planet.pos
      this.planetList.push(planet)
    }
    return this
  }
  /**
   * @param {number} deltaT
   * @param {CanvasRenderingContext2D} ctx
   */
  update(deltaT, ctx) {
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
        p.pos.x,
        p.pos.y,
        p.radius,
        0, PI2)
      ctx.fill()
      ctx.stroke()
      ctx.closePath()
      ctx.save()

      this.planetList.each(node_ => {
        /** @type {Planet} */
        const p2 = node_.value
        if (p !== p2) {
          const pos2 = p2.pos
          const dx = pos2.x - pos.x
          const dy = pos2.y - pos.y
          const distance = sqrt(dx ** 2 + dy ** 2) || 1
          if (distance < p.radius + p2.radius) collision(p, p2)

          const F = G * p2.mass / (distance ** 2)
          const fx = F * dx / distance
          const fy = F * dy / distance
          p.force.x += fx
          p.force.y += fy
          p2.force.x -= fx
          p2.force.y -= fy

          ctx.beginPath()
          ctx.strokeStyle = `hsla(0deg,0%,100%,${innerWidth / distance * 100}%)`
          ctx.moveTo(pos.x, pos.y)
          ctx.lineTo(pos2.x, pos2.y)
          ctx.stroke()
          ctx.closePath()
        }
      })
      ctx.restore()
    })
    this.planetList.each(node => {
      const p = node.value
      const pos = p.pos
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
      p.update(deltaT)
      const r = p.radius
      ctx.lineTo(pos.x, pos.y)
      ctx.strokeStyle = p.color
      ctx.stroke()
      ctx.closePath()
      // if (pos.x - r < 0) {
      //   pos.x = 0 + r
      //   p.vel.x *= -1
      // }
      // if (pos.x + r > innerWidth) {
      //   p.pos.x = innerWidth - r
      //   p.vel.x *= -1
      // }
      // if (pos.y - r < 0) {
      //   pos.y = 0 + r
      //   p.vel.y *= -1
      // }
      // if (pos.y + r > innerHeight) {
      //   p.pos.y = innerHeight - r
      //   p.vel.y *= -1
      // }
    })
  }
}