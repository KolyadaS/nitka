import "./PatternPreview.css";
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
  // триггер для пересчета bbox
  const bboxKey = JSON.stringify(parts);

  const { ref, bbox } = usePatternBBox(bboxKey);

  const textStyles = {
    title: 12,
    label: 6,
    note: 4,
  };

  if (!bbox) {
    return (
      <svg style={{ position: "absolute", opacity: 0 }}>
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="black" />
          </marker>
        </defs>

        <g ref={ref}>
          {parts.map((part, i) => (
            <g
              key={i}
              transform={`translate(${part.offsetX}, ${part.offsetY})`}
            >
              {part.shapes.map((shape, index) => {
                switch (shape.kind) {
                  case "path":
                    return <path key={index} d={buildPath(shape.commands)} />;

                  case "text":
                    return (
                      <text key={index} x={shape.x} y={shape.y}>
                        {shape.text}
                      </text>
                    );

                  case "grainline":
                    return (
                      <line
                        key={index}
                        x1={shape.x1}
                        y1={shape.y1}
                        x2={shape.x2}
                        y2={shape.y2}
                        markerEnd="url(#arrow)"
                      />
                    );
                }
              })}
            </g>
          ))}
        </g>
      </svg>
    );
  }

  return (
    <div className="patternPreview">
      {/* скрытый SVG для расчета bbox */}
      <svg style={{ position: "absolute", opacity: 0 }}>
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="black" />
          </marker>
        </defs>

        <g ref={ref}>
          {parts.map((part, i) => (
            <g
              key={i}
              transform={`translate(${part.offsetX}, ${part.offsetY})`}
            >
              {part.shapes.map((shape, index) => {
                switch (shape.kind) {
                  case "path":
                    return <path key={index} d={buildPath(shape.commands)} />;

                  case "text":
                    return (
                      <text
                        key={index}
                        x={shape.x}
                        y={shape.y}
                        fontSize={textStyles[shape.style || "label"]}
                      >
                        {shape.text}
                      </text>
                    );

                  case "grainline":
                    return (
                      <line
                        key={index}
                        x1={shape.x1}
                        y1={shape.y1}
                        x2={shape.x2}
                        y2={shape.y2}
                        markerEnd="url(#arrow)"
                      />
                    );
                }
              })}
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
        style={{
          border: "1px solid #ccc",
        }}
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L6,3 L0,6 Z" fill="black" />
          </marker>
        </defs>

        {parts.map((part, i) => (
          <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
            {part.shapes.map((shape, index) => {
              switch (shape.kind) {
                case "path":
                  return (
                    <path
                      key={index}
                      d={buildPath(shape.commands)}
                      stroke="black"
                      fill={shape.style === "main" ? "green" : "none"}
                      fillOpacity={shape.style === "main" ? 0.25 : 0}
                      strokeWidth={shape.style === "thin" ? 0.3 : 1}
                      strokeDasharray={
                        shape.style === "dashed" ? "6 2" : undefined
                      }
                    />
                  );

                case "text":
                  return (
                    <text
                      key={index}
                      x={shape.x}
                      y={shape.y}
                      fontSize={textStyles[shape.style || "label"]}
                      transform={
                        shape.rotation
                          ? `rotate(${shape.rotation} ${shape.x} ${shape.y})`
                          : undefined
                      }
                    >
                      {shape.text}
                    </text>
                  );

                case "grainline":
                  return (
                    <line
                      key={index}
                      x1={shape.x1}
                      y1={shape.y1}
                      x2={shape.x2}
                      y2={shape.y2}
                      stroke="black"
                      strokeWidth="0.5"
                      markerEnd="url(#arrow)"
                    />
                  );
              }
            })}
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

// ==========================================================================================

// import "./PatternPreview.css";
// import { buildPath } from "../../core/utils/buildPath";
// import { usePatternBBox } from "../../hooks/usePatternBBox";
// import { exportPatternToPdf } from "../../core/export/exportPdf";
// import { A4Grid } from "./A4Grid";
// import { Button } from "../Controls/Button/Button";
// import type { PatternPart } from "../../core/geometry/SunSkirt";

// interface Props {
//   parts: PatternPart[];
// }

// export function PatternPreview({ parts }: Props) {
//   // триггер для пересчета bbox
//   const bboxKey = JSON.stringify(parts);

//   const { ref, bbox } = usePatternBBox(bboxKey);

//   const textStyles = {
//     title: 12,
//     label: 6,
//     note: 4,
//   };

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 switch (shape.kind) {
//                   case "path":
//                     return <path key={index} d={buildPath(shape.commands)} />;

//                   case "text":
//                     return (
//                       <text key={index} x={shape.x} y={shape.y}>
//                         {shape.text}
//                       </text>
//                     );

//                   case "grainline":
//                     return (
//                       <line
//                         key={index}
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                       />
//                     );
//                 }
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>
//     );
//   }

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG для расчета bbox */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 switch (shape.kind) {
//                   case "path":
//                     return <path key={index} d={buildPath(shape.commands)} />;

//                   case "text":
//                     return (
//                       <text
//                         key={index}
//                         x={shape.x}
//                         y={shape.y}
//                         fontSize={textStyles[shape.style || "label"]}
//                       >
//                         {shape.text}
//                       </text>
//                     );

//                   case "grainline":
//                     return (
//                       <line
//                         key={index}
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                       />
//                     );
//                 }
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>

//       {/* превью */}
//       <svg
//         width="100%"
//         // height="80vh"
//         viewBox={`${bbox.x} ${bbox.y} ${Math.max(bbox.width, 210)} ${Math.max(
//           bbox.height,
//           297
//         )}`}
//         style={{
//           border: "1px solid #ccc",
//         }}
//       >
//         {parts.map((part, i) => (
//           <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
//             {part.shapes.map((shape, index) => {
//               switch (shape.kind) {
//                 case "path":
//                   return (
//                     <path
//                       key={index}
//                       d={buildPath(shape.commands)}
//                       stroke="black"
//                       fill={shape.style === "main" ? "green" : "none"}
//                       fillOpacity={shape.style === "main" ? 0.15 : 0}
//                       strokeWidth={shape.style === "thin" ? 0.3 : 1}
//                       strokeDasharray={
//                         shape.style === "dashed" ? "6 2" : undefined
//                       }
//                     />
//                   );

//                 case "text":
//                   return (
//                     <text
//                       key={index}
//                       x={shape.x}
//                       y={shape.y}
//                       fontSize={textStyles[shape.style || "label"]}
//                       transform={
//                         shape.rotation
//                           ? `rotate(${shape.rotation} ${shape.x} ${shape.y})`
//                           : undefined
//                       }
//                     >
//                       {shape.text}
//                     </text>
//                   );

//                 case "grainline":
//                   return (
//                     <line
//                       key={index}
//                       x1={shape.x1}
//                       y1={shape.y1}
//                       x2={shape.x2}
//                       y2={shape.y2}
//                       stroke="black"
//                     />
//                   );
//               }
//             })}
//           </g>
//         ))}

//         <A4Grid bbox={bbox} />
//       </svg>

//       <Button
//         onClick={() => {
//           exportPatternToPdf(parts, bbox);
//         }}
//       >
//         Скачать PDF
//       </Button>
//     </div>
//   );
// }

// ============================================================================================

// import "./PatternPreview.css";
// import { buildPath } from "../../core/utils/buildPath";
// import { usePatternBBox } from "../../hooks/usePatternBBox";
// import { exportPatternToPdf } from "../../core/export/exportPdf";
// import { A4Grid } from "./A4Grid";
// import { Button } from "../Controls/Button/Button";
// import type { PatternPart } from "../../core/geometry/SunSkirt";

// interface Props {
//   parts: PatternPart[];
// }

// export function PatternPreview({ parts }: Props) {
//   const { ref, bbox } = usePatternBBox("");

//   const textStyles = {
//     title: 12,
//     label: 6,
//     note: 4,
//   };

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 switch (shape.kind) {
//                   case "path":
//                     return <path key={index} d={buildPath(shape.commands)} />;

//                   case "text":
//                     return (
//                       <text key={index} x={shape.x} y={shape.y}>
//                         {shape.text}
//                       </text>
//                     );

//                   case "grainline":
//                     return (
//                       <line
//                         key={index}
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                       />
//                     );
//                 }
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>
//     );
//   }

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG для bbox */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 switch (shape.kind) {
//                   case "path":
//                     return <path key={index} d={buildPath(shape.commands)} />;

//                   case "text":
//                     return (
//                       <text
//                         key={index}
//                         x={shape.x}
//                         y={shape.y}
//                         fontSize={textStyles[shape.style || "label"]}
//                       >
//                         {shape.text}
//                       </text>
//                     );

//                   case "grainline":
//                     return (
//                       <line
//                         key={index}
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                       />
//                     );
//                 }
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>

//       {/* превью */}
//       {/* <svg
//         width="100%"
//         viewBox={`
//           ${bbox.x - 10}
//           ${bbox.y - 10}
//           ${Math.max(bbox.width + 20, 210)}
//           ${Math.max(bbox.height + 20, 297)}
//         `}
//       >
//         {parts.map((part, i) => (
//           <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
//             {part.shapes.map((shape, index) => {
//               switch (shape.kind) {
//                 case "path":
//                   return (
//                     <path
//                       key={index}
//                       d={buildPath(shape.commands)}
//                       stroke="black"
//                       fill={shape.style === "main" ? "green" : "none"}
//                       fillOpacity={shape.style === "main" ? 0.15 : 0}
//                       strokeWidth={shape.style === "thin" ? 0.3 : 1}
//                       strokeDasharray={
//                         shape.style === "dashed" ? "6 2" : undefined
//                       }
//                     />
//                   );

//                 case "text":
//                   return (
//                     <text
//                       key={index}
//                       x={shape.x}
//                       y={shape.y}
//                       fontSize={textStyles[shape.style || "label"]}
//                     >
//                       {shape.text}
//                     </text>
//                   );

//                 case "grainline":
//                   return (
//                     <g key={index}>
//                       <line
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                         stroke="black"
//                         strokeWidth="1"
//                       />

//                   );
//               }
//             })}
//           </g>
//         ))}

//         <A4Grid bbox={bbox} />
//       </svg> */}

//       <svg
//         width="100%"
//         height={`${(bbox.height / bbox.width) * 100}vw`}
//         viewBox={`
//     ${bbox.x - 10}
//     ${bbox.y - 10}
//     ${Math.max(bbox.width + 20, 210)}
//     ${Math.max(bbox.height + 20, 297)}
//   `}
//         style={{
//           border: "1px solid #ccc",
//           maxHeight: "90vh",
//         }}
//       >
//         {parts.map((part, i) => (
//           <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
//             {part.shapes.map((shape, index) => {
//               switch (shape.kind) {
//                 case "path":
//                   return (
//                     <path
//                       key={index}
//                       d={buildPath(shape.commands)}
//                       stroke="black"
//                       fill={shape.style === "main" ? "green" : "none"}
//                       fillOpacity={shape.style === "main" ? 0.15 : 0}
//                       strokeWidth={shape.style === "thin" ? 0.3 : 1}
//                       strokeDasharray={
//                         shape.style === "dashed" ? "6 2" : undefined
//                       }
//                     />
//                   );

//                 case "text":
//                   return (
//                     <text
//                       key={index}
//                       x={shape.x}
//                       y={shape.y}
//                       fontSize={textStyles[shape.style || "label"]}
//                     >
//                       {shape.text}
//                     </text>
//                   );

//                 case "grainline":
//                   return (
//                     <g key={index}>
//                       <line
//                         x1={shape.x1}
//                         y1={shape.y1}
//                         x2={shape.x2}
//                         y2={shape.y2}
//                         stroke="black"
//                       />

//                       <polygon
//                         points={`
//                     ${shape.x1 - 3},${shape.y1 + 8}
//                     ${shape.x1 + 3},${shape.y1 + 8}
//                     ${shape.x1},${shape.y1}
//                   `}
//                         fill="black"
//                       />

//                       <polygon
//                         points={`
//                     ${shape.x2 - 3},${shape.y2 - 8}
//                     ${shape.x2 + 3},${shape.y2 - 8}
//                     ${shape.x2},${shape.y2}
//                   `}
//                         fill="black"
//                       />
//                     </g>
//                   );
//               }
//             })}
//           </g>
//         ))}

//         <A4Grid bbox={bbox} />
//       </svg>

//       <Button
//         onClick={() => {
//           exportPatternToPdf(parts, bbox);
//         }}
//       >
//         Скачать PDF
//       </Button>

//       {console.log(bbox)}
//       {console.log(parts)}
//     </div>
//   );
// }

// ===================================================================================

// import "./PatternPreview.css";
// import { buildPath } from "../../core/utils/buildPath";
// import { usePatternBBox } from "../../hooks/usePatternBBox";
// import { exportPatternToPdf } from "../../core/export/exportPdf";
// import { A4Grid } from "./A4Grid";
// import { Button } from "../Controls/Button/Button";
// import type { PatternPart } from "../../core/geometry/SunSkirt";

// interface Props {
//   parts: PatternPart[];
// }

// export function PatternPreview({ parts }: Props) {
//   const { ref, bbox } = usePatternBBox("");

//   const textStyles = {
//     title: 12,
//     label: 6,
//     note: 4,
//   };

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 if (shape.kind !== "path") return null;

//                 return <path key={index} d={buildPath(shape.commands)} />;
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>
//     );
//   }

//   return (
//     <div className="patternPreview">
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               {part.shapes.map((shape, index) => {
//                 if (shape.kind !== "path") return null;

//                 return <path key={index} d={buildPath(shape.commands)} />;
//               })}
//             </g>
//           ))}
//         </g>
//       </svg>

//       <svg
//         width="100%"
//         viewBox={`${bbox.x} ${bbox.y} ${Math.max(bbox.width, 210)} ${Math.max(
//           bbox.height,
//           297
//         )}`}
//       >
//         {parts.map((part, i) => (
//           <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
//             {part.shapes.map((shape, index) => {
//               switch (shape.kind) {
//                 case "path":
//                   return (
//                     <path
//                       key={index}
//                       d={buildPath(shape.commands)}
//                       stroke="black"
//                       fill="none"
//                       strokeWidth={shape.style === "thin" ? 0.3 : 1}
//                       strokeDasharray={
//                         shape.style === "dashed" ? "6 2" : undefined
//                       }
//                     />
//                   );

//                 case "text":
//                   return (
//                     <text
//                       key={index}
//                       x={shape.x}
//                       y={shape.y}
//                       fontSize={textStyles[shape.style || "label"]}
//                     >
//                       {shape.text}
//                     </text>
//                   );

//                 case "grainline":
//                   return (
//                     <line
//                       key={index}
//                       x1={shape.x1}
//                       y1={shape.y1}
//                       x2={shape.x2}
//                       y2={shape.y2}
//                       stroke="black"
//                     />
//                   );
//               }
//             })}
//           </g>
//         ))}

//         <A4Grid bbox={bbox} />
//       </svg>

//       <Button
//         onClick={() => {
//           exportPatternToPdf(parts, bbox);
//         }}
//       >
//         Скачать PDF
//       </Button>
//     </div>
//   );
// }

// ===============================================================================================

// import "./PatternPreview.css";
// import { buildPath } from "../../core/utils/buildPath";
// import { usePatternBBox } from "../../hooks/usePatternBBox";
// import { exportPatternToPdf } from "../../core/export/exportPdf";
// import { A4Grid } from "./A4Grid";
// import { Button } from "../Controls/Button/Button";
// import type { PatternPart } from "../../core/geometry/SunSkirt";

// interface Props {
//   parts: PatternPart[];
// }

// export function PatternPreview({ parts }: Props) {
//   const fullPath = parts.map((p) => buildPath(p.commands)).join(" ");
//   const { ref, bbox } = usePatternBBox(fullPath);

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={fullPath} />
//       </svg>
//       // <svg style={{ position: "absolute", opacity: 0 }}>
//       //   <g ref={ref}>
//       //     {parts.map((part, i) => (
//       //       <g
//       //         key={i}
//       //         transform={`translate(${part.offsetX}, ${part.offsetY})`}
//       //       >
//       //         <path d={buildPath(part.commands)} />
//       //       </g>
//       //     ))}
//       //   </g>
//       // </svg>
//     );
//   }

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <g ref={ref}>
//           {parts.map((part, i) => (
//             <g
//               key={i}
//               transform={`translate(${part.offsetX}, ${part.offsetY})`}
//             >
//               <path d={buildPath(part.commands)} />
//             </g>
//           ))}
//         </g>
//       </svg>

//       {/* превью */}
//       <svg
//         width="100%"
//         viewBox={`${bbox.x} ${bbox.y} ${Math.max(bbox.width, 210)} ${Math.max(
//           bbox.height,
//           297
//         )}`}
//       >
//         {parts.map((part, i) => (
//           <g key={i} transform={`translate(${part.offsetX}, ${part.offsetY})`}>
//             <path
//               d={buildPath(part.commands)}
//               stroke="black"
//               fill="green"
//               strokeWidth="1"
//               fillOpacity="0.5"
//             />
//           </g>
//         ))}

//         <A4Grid bbox={bbox} />
//       </svg>

//       <Button
//         onClick={() => {
//           exportPatternToPdf(parts, bbox);
//         }}
//       >
//         Скачать PDF
//       </Button>
//     </div>
//   );
// }
