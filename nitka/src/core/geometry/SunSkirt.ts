import type {
  Measurements,
  PathCommand,
  PatternShape,
} from "../../types/types";

export interface PatternPart {
  shapes: PatternShape[];
  offsetX: number;
  offsetY: number;
}

export function generateSkirtPattern(m: Measurements): PatternPart[] {
  const seamAllowance = 10;
  const waistAllowance = 15;
  const hemAllowance = 15;
  const beltClosureAllowance = 50;
  const GAP = 10;

  const beltWidth = m.beltWidth;
  const waistRadius = Math.round(m.waist / 6.28) + waistAllowance;
  const lengthRadius = waistRadius + m.length;
  const hipsRadius = Math.round(m.hips / 6.28);

  const beltBase: PathCommand[] = [
    { type: "M", x: 0 + seamAllowance, y: 0 + seamAllowance }, // A
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance,
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance,
      y: 0 + seamAllowance,
    }, // B
    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance,
      y: beltWidth * 2 + seamAllowance,
    }, // C
    { type: "L", x: 0 + seamAllowance, y: beltWidth * 2 + seamAllowance }, // D
    { type: "Z" },
  ];

  const beltBaseFoldLine: PathCommand[] = [
    {
      type: "M",
      x: 0 + seamAllowance,
      y: Math.round(beltWidth * 2 * 10) / 20 + seamAllowance,
    },
    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance,
      y: Math.round(beltWidth * 2 * 10) / 20 + seamAllowance,
    },
  ];

  const beltClosure: PathCommand[] = [
    {
      type: "M",
      x: 2 * 3.14 * waistRadius + seamAllowance,
      y: seamAllowance,
    },
    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance,
      y: seamAllowance + beltWidth * 2,
    },
  ];

  const beltButton: PathCommand[] = [
    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + 5,
      y: seamAllowance + beltWidth * 1.5 - 4,
    },

    {
      type: "A",
      rx: 8,
      ry: 8,
      rotation: 0,
      largeArc: 1,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5,
      y: seamAllowance + beltWidth * 1.5 + 4,
    },

    {
      type: "A",
      rx: 8,
      ry: 8,
      rotation: 0,
      largeArc: 0,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5,
      y: seamAllowance + beltWidth * 1.5 - 4,
    },

    // ===============

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 4,
      y: seamAllowance + beltWidth * 1.5 - 1,
    },

    {
      type: "A",
      rx: 1,
      ry: 1,
      rotation: 0,
      largeArc: 1,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 4,
      y: seamAllowance + beltWidth * 1.5 + 1,
    },

    {
      type: "A",
      rx: 1,
      ry: 1,
      rotation: 0,
      largeArc: 0,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 4,
      y: seamAllowance + beltWidth * 1.5 - 1,
    },

    // ===============

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 10,
      y: seamAllowance + beltWidth * 1.5 - 1,
    },

    {
      type: "A",
      rx: 1,
      ry: 1,
      rotation: 0,
      largeArc: 1,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 10,
      y: seamAllowance + beltWidth * 1.5 + 1,
    },

    {
      type: "A",
      rx: 1,
      ry: 1,
      rotation: 0,
      largeArc: 0,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + 5 - 10,
      y: seamAllowance + beltWidth * 1.5 - 1,
    },
  ];

  const beltButtonHole: PathCommand[] = [
    {
      type: "M",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2 - 2,
      y: seamAllowance + beltWidth * 1.5 - 5,
    },

    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2 + 2,
      y: seamAllowance + beltWidth * 1.5 - 5,
    },

    {
      type: "M",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2,
      y: seamAllowance + beltWidth * 1.5 - 5,
    },

    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2,
      y: seamAllowance + beltWidth * 1.5 + 5,
    },

    {
      type: "M",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2 - 2,
      y: seamAllowance + beltWidth * 1.5 + 5,
    },

    {
      type: "L",
      x: 2 * 3.14 * waistRadius + seamAllowance + beltClosureAllowance / 2 + 2,
      y: seamAllowance + beltWidth * 1.5 + 5,
    },
  ];

  const beltAllowance: PathCommand[] = [
    { type: "M", x: 0, y: 0 }, // A
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance * 2,
      x: 2 * 3.14 * waistRadius + seamAllowance * 2 + beltClosureAllowance,
      y: 0,
    }, // B
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance * 2,
      x: 2 * 3.14 * waistRadius + seamAllowance * 2 + beltClosureAllowance,
      y: beltWidth * 2 + seamAllowance * 2,
    }, // C
    { type: "L", x: 0, y: beltWidth * 2 + seamAllowance * 2 }, // D
    { type: "L", x: 0, y: 0 },
    { type: "Z" },
  ];

  const skirtBase: PathCommand[] = [
    { type: "M", x: 0, y: waistRadius + seamAllowance }, // A
    {
      type: "A",
      rx: waistRadius,
      ry: waistRadius,
      rotation: 90,
      largeArc: 0,
      sweep: 0,
      x: waistRadius,
      y: 0 + seamAllowance,
    }, // B
    { type: "L", x: lengthRadius, y: 0 + seamAllowance }, // C
    {
      type: "A",
      rx: lengthRadius,
      ry: lengthRadius,
      rotation: 90,
      largeArc: 0,
      sweep: 1,
      x: 0,
      y: lengthRadius + seamAllowance,
    },
  ];

  const skirtBaseFoldLine: PathCommand[] = [
    { type: "M", x: 0, y: waistRadius + seamAllowance },

    { type: "L", x: 0, y: lengthRadius + seamAllowance },
  ];

  const skirtAllowance: PathCommand[] = [
    { type: "M", x: 0, y: waistRadius },

    {
      type: "A",
      rx: waistRadius - seamAllowance,
      ry: waistRadius - seamAllowance,
      rotation: 90,
      largeArc: 0,
      sweep: 0,
      x: waistRadius - seamAllowance,
      y: seamAllowance,
    },

    { type: "L", x: waistRadius - seamAllowance, y: 0 },

    {
      type: "L",
      x: lengthRadius + seamAllowance + hemAllowance,
      y: 0,
    },

    {
      type: "L",
      x: lengthRadius + seamAllowance + hemAllowance,
      y: seamAllowance,
    },

    {
      type: "A",
      rx: lengthRadius + hemAllowance + seamAllowance,
      ry: lengthRadius + hemAllowance + seamAllowance,
      rotation: 90,
      largeArc: 0,
      sweep: 1,
      x: 0,
      y: lengthRadius + 2 * seamAllowance + hemAllowance,
    },

    { type: "Z" },
  ];

  const zipper: PathCommand[] = [
    {
      type: "M",
      x: waistRadius,
      y: seamAllowance + 1,
    },

    {
      type: "L",
      x: seamAllowance + waistRadius + hipsRadius,
      y: seamAllowance + 1,
    },

    {
      type: "L",
      x: seamAllowance + waistRadius + hipsRadius,
      y: seamAllowance + 11,
    },

    {
      type: "L",
      x: seamAllowance + waistRadius + hipsRadius,
      y: seamAllowance + 1,
    },
  ];

  return [
    {
      offsetX: 0,
      offsetY: 0,

      shapes: [
        {
          kind: "path",
          style: "main",
          commands: beltBase,
        },

        {
          kind: "path",
          style: "dashed",
          commands: beltBaseFoldLine,
        },

        {
          kind: "path",
          style: "main",
          commands: beltClosure,
        },

        {
          kind: "path",
          style: "main",
          commands: beltButton,
        },

        {
          kind: "path",
          style: "main",
          commands: beltButtonHole,
        },

        {
          kind: "path",
          style: "thin",
          commands: beltAllowance,
        },

        {
          kind: "text",
          x: seamAllowance + 10,
          y: seamAllowance + 10,
          text: "Юбка-солнце - пояс - 1 деталь",
          style: "title",
        },

        {
          kind: "text",
          x: 3.14 * waistRadius,
          y: Math.round(beltWidth * 2 * 10) / 20 + seamAllowance - 2,
          text: "Линия сгиба пояса",
          style: "label",
        },
      ],
    },

    {
      offsetX: 0,
      offsetY: beltWidth * 2 + seamAllowance * 2 + GAP,

      shapes: [
        {
          kind: "path",
          style: "main",
          commands: skirtBase,
        },

        {
          kind: "path",
          style: "dashed",
          commands: skirtBaseFoldLine,
        },

        {
          kind: "path",
          style: "thin",
          commands: skirtAllowance,
        },

        {
          kind: "path",
          style: "main",
          commands: zipper,
        },

        {
          kind: "grainline",
          x1: seamAllowance + 10,
          y1: waistRadius + seamAllowance + 10,
          x2: seamAllowance + 10,
          y2: lengthRadius,
        },

        {
          kind: "text",
          x: (seamAllowance + hipsRadius) / 2 + waistRadius - 8,
          y: seamAllowance + 8,
          text: "Молния",
          style: "label",
        },

        {
          kind: "text",
          x: (waistRadius + seamAllowance + lengthRadius) / 2,
          y: seamAllowance + 8,
          text: "Боковой шов",
          style: "label",
        },

        {
          kind: "text",
          x: waistRadius + seamAllowance + 10,
          y: seamAllowance + 30,
          text: "Юбка-солнце - передняя половинка - 1 деталь со сгибом",
          style: "title",
        },

        {
          kind: "text",
          x: waistRadius + seamAllowance + 10,
          y: seamAllowance + 45,
          text: "Юбка-солнце - задняя половинка - 1 деталь со сгибом",
          style: "title",
        },

        {
          kind: "text",
          x: 2,
          y: ((waistRadius + seamAllowance + lengthRadius) / 2) * 0.8,
          text: "Линия сгиба передней/задней половинки юбки",
          style: "label",
          rotation: 90,
        },

        {
          kind: "text",
          x: seamAllowance + 12,
          y: ((waistRadius + seamAllowance + lengthRadius) / 2) * 0.9,
          text: "Долевая нить",
          style: "label",
          rotation: 90,
        },
      ],
    },
  ];
}

// ==============================================================================================================

// import type { Measurements, PathCommand } from "../../types/types";

// export interface PatternPart {
//   commands: PathCommand[];
//   offsetX: number;
//   offsetY: number;
// }

// export function generateSkirtPattern(m: Measurements): PatternPart[] {
//   const seamAllowance = 10; // припуск на шов
//   const waistAllowance = 15; // прибавка по талии на свободу облегания
//   const hemAllowance = 15; // припуск на подгибку
//   const beltClosureAllowance = 50; // прибавка к длине пояса на застежку
//   const GAP = 10; // расстояние между деталями

//   const beltWidth = m.beltWidth * 2; // двойная ширина пояса
//   const waistRadius = Math.round(m.waist / 6.28) + waistAllowance; // радиус по талии
//   const lengthRaduis = waistRadius + m.length; // радиус до подола юбки
//   const r3 = Math.round(m.hips / 6.28); // радиус до линии бедер

//   // ПОЯС — локально (0,0)
//   const belt: PathCommand[] = [
//     { type: "M", x: 0 + seamAllowance, y: 0 + seamAllowance }, // A
//     {
//       type: "L",
//       x: m.waist + beltClosureAllowance + seamAllowance,
//       y: 0 + seamAllowance,
//     }, // B
//     {
//       type: "L",
//       x: m.waist + beltClosureAllowance + seamAllowance,
//       y: beltWidth + seamAllowance,
//     }, // C
//     { type: "L", x: 0 + seamAllowance, y: beltWidth + seamAllowance }, // D
//     { type: "L", x: 0 + seamAllowance, y: 0 + seamAllowance },
//     {
//       type: "M",
//       x: 0 + seamAllowance,
//       y: Math.round(beltWidth * 10) / 20 + seamAllowance,
//     },
//     {
//       type: "L",
//       x: m.waist + beltClosureAllowance + seamAllowance,
//       y: Math.round(beltWidth * 10) / 20 + seamAllowance,
//     },
//     { type: "Z" },

//     { type: "M", x: 0, y: 0 }, // A
//     {
//       type: "L",
//       x: m.waist + beltClosureAllowance + seamAllowance * 2,
//       y: 0,
//     }, // B
//     {
//       type: "L",
//       x: m.waist + beltClosureAllowance + seamAllowance * 2,
//       y: beltWidth + seamAllowance * 2,
//     }, // C
//     { type: "L", x: 0, y: beltWidth + seamAllowance * 2 }, // D
//     { type: "L", x: 0, y: 0 },
//     { type: "Z" },
//   ];

//   // ЮБКА — тоже локально (0,0)
//   const skirt: PathCommand[] = [
//     { type: "M", x: 0 + seamAllowance, y: waistRadius + seamAllowance }, // A
//     {
//       type: "A",
//       rx: waistRadius,
//       ry: waistRadius,
//       rotation: 90,
//       largeArc: 0,
//       sweep: 0,
//       x: waistRadius + seamAllowance,
//       y: 0 + seamAllowance,
//     }, // B
//     { type: "L", x: lengthRaduis + seamAllowance, y: 0 + seamAllowance }, // C
//     {
//       type: "A",
//       rx: lengthRaduis,
//       ry: lengthRaduis,
//       rotation: 90,
//       largeArc: 0,
//       sweep: 1,
//       x: 0 + seamAllowance,
//       y: lengthRaduis + seamAllowance,
//     },
//     { type: "Z" },

//     // припуски

//     { type: "M", x: 0, y: waistRadius },
//     { type: "L", x: seamAllowance, y: waistRadius },
//     {
//       type: "A",
//       rx: waistRadius - seamAllowance,
//       ry: waistRadius - seamAllowance,
//       rotation: 90,
//       largeArc: 0,
//       sweep: 0,
//       x: waistRadius,
//       y: seamAllowance,
//     }, // B
//     { type: "L", x: waistRadius, y: 0 },
//     { type: "L", x: lengthRaduis + seamAllowance + hemAllowance, y: 0 }, // C
//     {
//       type: "L",
//       x: lengthRaduis + seamAllowance + hemAllowance,
//       y: seamAllowance,
//     },
//     {
//       type: "A",
//       rx: lengthRaduis + hemAllowance,
//       ry: lengthRaduis + hemAllowance,
//       rotation: 90,
//       largeArc: 0,
//       sweep: 1,
//       x: seamAllowance,
//       y: lengthRaduis + seamAllowance + hemAllowance,
//     },
//     {
//       type: "L",
//       x: 0,
//       y: lengthRaduis + seamAllowance + hemAllowance,
//     },
//     { type: "Z" },
//     { type: "M", x: r3, y: 0 },
//     { type: "L", x: r3, y: 0 },
//   ];

//   return [
//     {
//       commands: belt,
//       offsetX: 0,
//       offsetY: 0,
//     },
//     {
//       commands: skirt,
//       offsetX: 0,
//       offsetY: beltWidth + seamAllowance * 2 + GAP,
//     },
//   ];
// }
