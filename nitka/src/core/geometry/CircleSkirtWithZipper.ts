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
  const pi = 3.14;
  const seamAllowance = 10;
  const waistAllowance = 0.0214; // 1.5 см на талию 70 см, 3 см на талию 140 см
  const hemAllowance = 15;
  const GAP = 10;

  const beltWidth = m.beltWidth;
  const beltClosureAllowance = beltWidth * 1.5;
  const waistRadius = Math.round((m.waist * (1 + waistAllowance)) / 2 / pi);
  const lengthRadius = waistRadius + m.length;
  const hipsRadius = Math.round(m.hips / 2 / pi);

  const beltBase: PathCommand[] = [
    { type: "M", x: 0 + seamAllowance, y: 0 + seamAllowance }, // A
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance,
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance,
      y: 0 + seamAllowance,
    }, // B
    {
      type: "L",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance,
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
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance,
      y: Math.round(beltWidth * 2 * 10) / 20 + seamAllowance,
    },
  ];

  const beltClosure: PathCommand[] = [
    {
      type: "M",
      x: 2 * pi * waistRadius + seamAllowance,
      y: seamAllowance,
    },
    {
      type: "L",
      x: 2 * pi * waistRadius + seamAllowance,
      y: seamAllowance + beltWidth * 2,
    },
  ];

  const beltButton: PathCommand[] = [
    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.35 + 0.5,
      y: seamAllowance + beltWidth * 1.5,
    },

    {
      type: "A",
      rx: beltWidth * 0.35,
      ry: beltWidth * 0.35,
      rotation: 0,
      largeArc: 1,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.35 + 0.5,
      y: seamAllowance + beltWidth * 1.5 + 0.5,
    },

    {
      type: "A",
      rx: beltWidth * 0.35,
      ry: beltWidth * 0.35,
      rotation: 0,
      largeArc: 0,
      sweep: 0,
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.35 + 0.5,
      y: seamAllowance + beltWidth * 1.5,
    },

    // ===============

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.16,
      y: seamAllowance + beltWidth * 1.5 - beltWidth * 0.04,
    },

    {
      type: "L",
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.16,
      y: seamAllowance + beltWidth * 1.5 + beltWidth * 0.04,
    },

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.12,
      y: seamAllowance + beltWidth * 1.5,
    },

    {
      type: "L",
      x: seamAllowance + beltClosureAllowance / 2 + beltWidth * 0.2,
      y: seamAllowance + beltWidth * 1.5,
    },

    // ===============

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 - beltWidth * 0.12,
      y: seamAllowance + beltWidth * 1.5 - beltWidth * 0.04,
    },

    {
      type: "L",
      x: seamAllowance + beltClosureAllowance / 2 - beltWidth * 0.12,
      y: seamAllowance + beltWidth * 1.5 + beltWidth * 0.04,
    },

    {
      type: "M",
      x: seamAllowance + beltClosureAllowance / 2 - beltWidth * 0.08,
      y: seamAllowance + beltWidth * 1.5,
    },

    {
      type: "L",
      x: seamAllowance + beltClosureAllowance / 2 - beltWidth * 0.16,
      y: seamAllowance + beltWidth * 1.5,
    },
  ];

  const beltButtonHole: PathCommand[] = [
    {
      type: "M",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2 - 2,
      y: seamAllowance + beltWidth * 1.5 - beltWidth * 0.3,
    },

    {
      type: "L",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2 + 2,
      y: seamAllowance + beltWidth * 1.5 - beltWidth * 0.3,
    },

    {
      type: "M",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2,
      y: seamAllowance + beltWidth * 1.5 - beltWidth * 0.3,
    },

    {
      type: "L",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2,
      y: seamAllowance + beltWidth * 1.5 + beltWidth * 0.3,
    },

    {
      type: "M",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2 - 2,
      y: seamAllowance + beltWidth * 1.5 + beltWidth * 0.3,
    },

    {
      type: "L",
      x: 2 * pi * waistRadius + seamAllowance + beltClosureAllowance / 2 + 2,
      y: seamAllowance + beltWidth * 1.5 + beltWidth * 0.3,
    },
  ];

  const beltAllowance: PathCommand[] = [
    { type: "M", x: 0, y: 0 }, // A
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance * 2,
      x: 2 * pi * waistRadius + seamAllowance * 2 + beltClosureAllowance,
      y: 0,
    }, // B
    {
      type: "L",
      // x: m.waist + beltClosureAllowance + seamAllowance * 2,
      x: 2 * pi * waistRadius + seamAllowance * 2 + beltClosureAllowance,
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
      x: hipsRadius + seamAllowance,
      y: seamAllowance + 1,
    },

    {
      type: "L",
      x: hipsRadius + seamAllowance,
      y: seamAllowance + 11,
    },

    {
      type: "L",
      x: hipsRadius + seamAllowance,
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
          y: seamAllowance + 8,
          text: "Юбка-солнце - пояс - 1 деталь",
          style: "title",
        },

        {
          kind: "text",
          x: pi * waistRadius,
          y: Math.round(beltWidth * 2 * 10) / 20 + seamAllowance - 1,
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
          x1: seamAllowance,
          y1: waistRadius + seamAllowance + 10,
          x2: seamAllowance,
          y2: lengthRadius,
        },

        {
          kind: "text",
          x: waistRadius + (hipsRadius - waistRadius) / 2,
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
          x: seamAllowance + 2,
          y: ((waistRadius + seamAllowance + lengthRadius) / 2) * 0.9,
          text: "Долевая нить",
          style: "label",
          rotation: 90,
        },
      ],
    },
  ];
}
