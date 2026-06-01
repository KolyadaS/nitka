import "./PatternPreview.css";
import { buildPath } from "../../core/utils/buildPath";
import { usePatternBBox } from "../../hooks/usePatternBBox";
import { exportPatternToPdf } from "../../core/export/exportPdf";
import { A4Grid } from "./A4Grid";
import { Button } from "../Controls/Button/Button";
import type { PatternPart } from "../../core/geometry/CircleSkirtWithZipper";
import { TEXT_STYLES } from "../../core/constants/TextStyles";
interface Props {
  parts: PatternPart[];
}

export function PatternPreview({ parts }: Props) {
  // триггер для пересчета bbox
  const bboxKey = JSON.stringify(parts);

  const { ref, bbox } = usePatternBBox(bboxKey);

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
                        // fontSize={textStyles[shape.style || "label"]}
                        fontSize={TEXT_STYLES[shape.style || "label"]}
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
                      fontSize={TEXT_STYLES[shape.style || "label"]}
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
