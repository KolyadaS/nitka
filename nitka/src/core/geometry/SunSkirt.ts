import type { Measurements, PathCommand } from "../../types/types";

export interface PatternPart {
  commands: PathCommand[];
  offsetX: number;
  offsetY: number;
}

export function generateSkirtPattern(m: Measurements): PatternPart[] {
  const rWaist = Math.round(m.waist / 6.28);
  const rLength = rWaist + m.length;
  const r3 = Math.round(m.hips / 6.28);

  const beltWidth = m.beltWidth * 2;

  const GAP = 10; // расстояние между деталями

  // ПОЯС — локально (0,0)
  const belt: PathCommand[] = [
    { type: "M", x: 0, y: 0 },
    { type: "L", x: m.waist + 5, y: 0 },
    { type: "L", x: m.waist + 5, y: beltWidth },
    { type: "L", x: 0, y: beltWidth },
    { type: "L", x: 0, y: 0 },
    { type: "M", x: 0, y: Math.round(beltWidth * 10) / 20 },
    { type: "L", x: m.waist + 5, y: Math.round(beltWidth * 10) / 20 },
    { type: "Z" },
  ];

  // ЮБКА — тоже локально (0,0)
  const skirt: PathCommand[] = [
    { type: "M", x: 0, y: rWaist },
    {
      type: "A",
      rx: rWaist,
      ry: rWaist,
      rotation: 90,
      largeArc: 0,
      sweep: 0,
      x: rWaist,
      y: 0,
    },
    { type: "L", x: rLength, y: 0 },
    {
      type: "A",
      rx: rLength,
      ry: rLength,
      rotation: 90,
      largeArc: 0,
      sweep: 1,
      x: 0,
      y: rLength,
    },
    { type: "Z" },
    { type: "M", x: r3, y: 0 },
    { type: "L", x: r3, y: 0 },
  ];

  return [
    {
      commands: belt,
      offsetX: 0,
      offsetY: 0,
    },
    {
      commands: skirt,
      offsetX: 0,
      offsetY: beltWidth + GAP, // 👈 вот здесь вся магия
    },
  ];
}

// import type { Measurements, PathCommand } from "../../types/types";

// export function generateSkirtPattern(m: Measurements): PathCommand[] {

//   const rWaist = Math.round(m.waist / 6.28);
//   const rLength = rWaist + m.length;
//   const r3 = Math.round(m.hips / 6.28);
//   const beltWidth = m.beltWidth * 2;

//   const belt: PathCommand[] = [
//     {type: "M", x: 0, y: 0},
//     {type: "L", x: m.waist + 5, y: 0},
//     {type: "L", x: m.waist + 5, y: beltWidth},
//     {type: "L", x: 0, y:beltWidth},
//     {type: "L", x: 0, y:0},
//     {type: "M", x: 0, y:Math.round(beltWidth * 10) / 20},
//     {type: "L", x: m.waist + 5, y:Math.round(beltWidth *10) / 20},
//     {type: "Z"},
//   ]

//     const skirt: PathCommand[] = [
//       {type: "M", x: 0, y: rWaist + beltWidth+5},
//       {type: "A", rx: rWaist, ry: rWaist, rotation: 90, largeArc: 0, sweep: 0, x: rWaist, y: beltWidth+5},
//       {type: "L", x: rLength, y: beltWidth+5},
//       {type: "A", rx: rLength, ry: rLength, rotation: 90, largeArc: 0, sweep: 1, x: 0, y: rLength + beltWidth+5},
//       {type: "Z"},
//       {type: "M", x: r3, y: beltWidth+5},
//       {type: "L", x: r3, y: beltWidth+5},
//   ];

//   return [...belt, ...skirt];
// }
