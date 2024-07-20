import { is, each, search, v2, Vector2 } from "./import.js"

const { random, PI, sqrt } = Math
const PI2 = PI * 2
export class Planet {
  constructor(pos, {
    mass,
    color,
    notMove
  } = {}) {
    this.pos = pos || v2.zero()
    this.vel = v2.zero()
    this.force = v2.zero()
    this.mass = mass || 10
    this.radius = sqrt(this.mass) * 2
    this.color = color || "white"
    this.borderColor = "white"
    this.notMove = notMove || false
  }
  update(deltaT, ctx) {
    const { notMove, vel, pos, force, color, radius,borderColor } = this
    if (!notMove) {
      vel.addVec(force.mul(deltaT))
      pos.x += vel.x * deltaT
      pos.y += vel.y * deltaT
      force.clear()
    }
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(pos.x, pos.y, radius, 0, PI2)
    ctx.fill()
    ctx.strokeStyle = borderColor
    ctx.stroke()
    ctx.closePath()
    return this
  }
}