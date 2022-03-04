import { is, each, search, v2, Vector2 } from "./import.js"

const { random, PI, sqrt } = Math
const PI2 = PI * 2
export class Planet {
  constructor(pos, {
    mass,
    radius,
    color,
    notMove
  } = {}) {
    this.pos = pos || v2.zero()
    this.vel = v2(random() - 0.5, random() - 0.5)
    this.force = v2.zero()
    this.mass = mass || 1
    this.radius = sqrt(this.mass) * 2
    this.color = color || "white"
    this.border = "black"
    this.notMove = notMove || false
  }
  addForce(f) {
    this.force.add(f.x / this.mass, f.y / this.mass)
    return this
  }
  subForce(f) {
    this.force.add(-f.x / this.mass, -f.y / this.mass)
    return this
  }
  update(deltaT, ctx) {
    const { notMove, vel, pos, force, color, radius } = this
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
    ctx.closePath()
    return this
  }
}