import "./PatternPreview.css";
import type { PathCommand } from "../../types/types";

interface Props {
  commands: PathCommand[];
}

export function PatternPreview({ commands }: Props) {
  // let maxX: number = 210;
  // let maxY: number = 297;

  const path = commands
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

  return (
    <div className="patternPreview">
      <svg width="400mm" height="600mm" viewBox="0 0 400 600">
        <path
          d={path}
          stroke="black"
          fill="green"
          stroke-width="1"
          fill-opacity="0.5"
        />
      </svg>
    </div>
  );
}
