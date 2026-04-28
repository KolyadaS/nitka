export interface Measurements {
  waist: number;
  hips: number;
  length: number;
  beltWidth: number;
}

export type PathCommand =
  | {type: "M", x: number, y: number}
  | {type: "L", x: number, y: number}
  | {type: "A", rx: number, ry: number, rotation: number, largeArc: number, sweep: number, x: number, y: number}
  | {type: "Z"};