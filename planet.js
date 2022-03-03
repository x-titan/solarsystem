import { is, each, v2, Vector2 } from "./import.js"

export class Planet {
  constructor(pos, {
    mass,
    radius,
    color
  } = {}) {
    this.pos = pos || v2.zero()
    this.vel = v2(Math.random() - 0.5, Math.random() - 0.5).mul(30)
    this.force = v2.zero()
    this.mass = mass || 100
    this.radius = radius || 1
    this.color = color || "white"
    this.border = "black"
  }
  update(deltaT) {
    const ax = this.force.x / this.mass
    const ay = this.force.y / this.mass
    const vel = this.vel
    vel.x += ax * deltaT
    vel.y += ay * deltaT
    this.pos.x += vel.x * deltaT
    this.pos.y += vel.y * deltaT
    return this
  }
}