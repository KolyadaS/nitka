import type { Measurements, PathCommand } from "../../types/types";

export function generateSkirtPattern(m: Measurements): PathCommand[] {

  const r1 = Math.round(m.waist / 6.28);
  const r2 = r1 + m.length;
  const r3 = Math.round(m.hips / 6.28);

  const belt: PathCommand[] = [
    {type: "M", x: 0, y: 0},
    {type: "L", x: m.waist + 5, y: 0},
    {type: "L", x: m.waist + 5, y: 8},
    {type: "L", x: 0, y:8},
    {type: "L", x: 0, y:0},
    {type: "M", x: 0, y:4},
    {type: "L", x: m.waist + 5, y:4},
    {type: "Z"},
  ]

    const skirt: PathCommand[] = [
      {type: "M", x: 0, y: r1+10},
      {type: "A", rx: r1, ry: r1, rotation: 90, largeArc: 0, sweep: 0, x: r1, y: 10},
      {type: "L", x: r2, y: 10},
      {type: "A", rx: r2, ry: r2, rotation: 90, largeArc: 0, sweep: 1, x: 0, y: r2+10},
      {type: "Z"},
      {type: "M", x: r3, y: 10},
      {type: "L", x: r3, y: 15},
  ];

  return [...belt, ...skirt];
}