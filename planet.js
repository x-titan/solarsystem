import { is, each, v2, Vector2 } from "./import.js"

export class Planet {
  constructor() {
    this.pos = v2.zero()
    this.vel = v2.zero()
    this.mass = 1
    this.radius = 1
    this.color = "white"
    this.border = "black"
  }
  update(deltaT) {
    this.pos.addVec(
      this.vel
        .clone()
        .mul(deltaT))
    return this
  }
}