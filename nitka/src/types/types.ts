export interface Measurements {
  waist: number;
  hips: number;
  length: number;
  beltWidth: number;
}

export type PathCommand =
  | {
      type: "M" | "L";
      x: number;
      y: number;
    }
  | {
      type: "A";
      rx: number;
      ry: number;
      rotation: number;
      largeArc: number;
      sweep: number;
      x: number;
      y: number;
    }
  | {
      type: "Z";
    };

export type LineStyle = "main" | "dashed" | "thin" | "construction";

export interface PathShape {
  kind: "path";
  commands: PathCommand[];
  style?: LineStyle;
  fill?: string;
}

export type TextStyle = "title" | "label" | "note";
export interface TextShape {
  kind: "text";
  x: number;
  y: number;
  text: string;
  style?: TextStyle;
  rotation?: number;
}

export interface GrainlineShape {
  kind: "grainline";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type PatternShape = PathShape | TextShape | GrainlineShape;

// ===============================================================================

// export interface Measurements {
//   waist: number;
//   hips: number;
//   length: number;
//   beltWidth: number;
// }

// export type PathCommand =
//   | {type: "M", x: number, y: number}
//   | {type: "L", x: number, y: number}
//   | {type: "A", rx: number, ry: number, rotation: number, largeArc: number, sweep: number, x: number, y: number}
//   | {type: "Z"};
