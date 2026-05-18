import type { PathCommand } from "../../types/types";

export function buildPath(commands: PathCommand[]): string {
  return commands
    .map((cmd) => {
      switch (cmd.type) {
        case "M":
        case "L":
          return `${cmd.type} ${cmd.x} ${cmd.y}`;

        case "A":
          return `A ${cmd.rx} ${cmd.ry} ${cmd.rotation} ${cmd.largeArc} ${cmd.sweep} ${cmd.x} ${cmd.y}`;

        case "Z":
          return "Z";
      }
    })
    .join(" ");
}

// =====================================================================================

// import type { PathCommand } from "../../types/types";

// export function buildPath(commands: PathCommand[]): string {
//   return commands
//     .map((cmd) => {
//       switch (cmd.type) {
//         case "M":
//         case "L":
//           return `${cmd.type} ${cmd.x} ${cmd.y}`;
//         case "A":
//           return `A ${cmd.rx} ${cmd.ry} ${cmd.rotation} ${cmd.largeArc} ${cmd.sweep} ${cmd.x} ${cmd.y}`;
//         case "Z":
//           return "Z";
//       }
//     })
//     .join(" ");
// }
