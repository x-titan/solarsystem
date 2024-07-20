import { random } from "./import.js"

export function RandomHSLColor() {
  return "hsl(" + random(0, 356) + ",100%,50%)"
}