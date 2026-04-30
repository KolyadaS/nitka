import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
import { buildPath } from "../../core/utils/buildPath";
import { usePatternBBox } from "../../hooks/usePatternBBox";
import { exportPatternToPdf } from "../../core/export/exportPdf";
import { A4Grid } from "./A4Grid";
import { Button } from "../Controls/Button/Button";
import type { PatternPart } from "../../core/geometry/SunSkirt";

interface Props {
  parts: PatternPart[];
}

export function PatternPreview({ parts }: Props) {
  const fullPath = parts.map((p) => buildPath(p.commands)).join(" ");
  const { ref, bbox } = usePatternBBox(fullPath);

  if (!bbox) {
    return (
      <svg style={{ position: "absolute", opacity: 0 }}>
        <path ref={ref} d={fullPath} />
      </svg>
      // <svg style={{ position: "absolute", opacity: 0 }}>
      //   <g ref={ref}>
      //     {parts.map((part, i) => (
      //       <g
      //         key={i}
      //         transform={`translate(${part.offsetX}, ${part.offsetY})`}
      //       >
      //         <path d={buildPath(part.commands)} />
      //       </g>
      //     ))}
      //   </g>
      // </svg>
    );
  }

  return (
    <div className="patternPreview">
      {/* скрытый SVG */}
      <svg style={{ position: "absolute", opacity: 0 }}>
        {/* <path ref={ref} d={fullPath} /> */}
        <g ref={ref}>
          {parts.map((part, i) => (
            <g
              key={i}
              transform={`translate(${part.offsetX}, ${part.offsetY})`}
            >
              <path d={buildPath(part.commands)} />
            </g>
          ))}
        </g>
      </svg>

      {/* превью */}
      <svg
        width="100%"
        viewBox={`${bbox.x} ${bbox.y} ${Math.max(bbox.width, 210)} ${Math.max(
          bbox.height,
          297
        )}`}
        // style={{ border: "3px solid #ccc" }}
      >
        {parts.map((part, i) => (
          <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
            <path
              d={buildPath(part.commands)}
              stroke="black"
              fill="green"
              strokeWidth="1"
              fillOpacity="0.5"
            />
          </g>
        ))}

        <A4Grid bbox={bbox} />
      </svg>

      <Button
        onClick={() => {
          exportPatternToPdf(parts, bbox);
        }}
      >
        Скачать PDF
      </Button>
    </div>
  );
}

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
// import { buildPath } from "../../core/utils/buildPath";
// import { usePatternBBox } from "../../hooks/usePatternBBox";
// import { exportPatternToPdf } from "../../core/export/exportPdf";
// import { A4Grid } from "./A4Grid";
// import { Button } from "../Controls/Button/Button";

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   const path = buildPath(commands);
//   const { ref, bbox } = usePatternBBox(path);

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>
//     );
//   }

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>

//       {/* превью */}
//       <svg
//         width="100%"
//         viewBox={`${bbox.x} ${bbox.y} ${Math.max(bbox.width, 210)} ${Math.max(
//           bbox.height,
//           297
//         )}`}
//         // style={{ border: "3px solid #ccc" }}
//       >
//         <path
//           d={path}
//           stroke="black"
//           fill="green"
//           strokeWidth="1"
//           fillOpacity="0.5"
//         />

//         <A4Grid bbox={bbox} />
//       </svg>

//       <Button
//         onClick={() => {
//           exportPatternToPdf(path, bbox);
//         }}
//       >
//         Скачать PDF
//       </Button>
//     </div>
//   );
// }
