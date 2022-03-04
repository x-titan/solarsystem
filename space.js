import { List, v2, AVector, Vector2 } from "./import.js"
import { Planet } from "./planet.js"

const valueminmax = (v, min, max) => {
  if (min && v < min) v = min
  if (max && v > max) v = max
  return v
}
const G = 6.67430 * (10 * 500)
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

      this.planetList.each(node_ => {
        /** @type {Planet} */
        const p2 = node_.value
        if (p !== p2) {
          const force = pos.clone().sub(pos2)
          const pos2 = p2.pos
          const dx = pos.x - pos2.x
          const dy = pos.y - pos2.y
          const distance = valueminmax(sqrt(dx ** 2 + dy ** 2), 100, 1000)
          if (distance < p.radius + p2.radius) collision(p, p2)
          const g = G
          const strength = (g * (p.mass * p2.mass)) / distance;
        }
      })
    })
    this.planetList.each(node => {
      const p = node.value
      const pos = p.pos
      const r = p.radius
      const w2 = innerWidth / 2
      const h2 = innerHeight / 2
      if (pos.x - r < -w2) {
        pos.x = -w2 + r
        p.vel.x *= -1
      }
      if (pos.x + r > w2) {
        p.pos.x = w2 - r
        p.vel.x *= -1
      }
      if (pos.y - r < -h2) {
        pos.y = -h2 + r
        p.vel.y *= -1
      }
      if (pos.y + r > h2) {
        p.pos.y = h2 - r
        p.vel.y *= -1
      }
      p.update(deltaT, ctx)
    })
  }
}