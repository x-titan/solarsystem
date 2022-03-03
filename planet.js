import { is, each, search, v2, Vector2 } from "./import.js"

const { random } = Math
export class Planet {
  constructor(pos, {
    mass,
    radius,
    color,
    notMove
  } = {}) {
    this.pos = pos || v2.zero()
    this.vel = v2(random() - 0.5, random() - 0.5).mul(500)
    this.force = v2.zero()
    this.mass = mass || 10
    this.radius = radius || 10
    this.color = color || "white"
    this.border = "black"
    this.notMove = notMove || false
  }
  update(deltaT) {
    if (this.notMove) return this
    let ax = this.force.x / this.mass
    let ay = this.force.y / this.mass
    const vel = this.vel
    if (vel.len() > 5000) vel.div(4000)
    if (vel.x < 0) ax *= -1
    if (vel.y < 0) ay *= -1
    vel.x += ax * deltaT
    vel.y += ay * deltaT

    this.pos.x += vel.x * deltaT
    this.pos.y += vel.y * deltaT
    return this
  }
}