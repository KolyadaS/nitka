import jsPDF from "jspdf";
import "svg2pdf.js";
import { robotoBase64 } from "../../assets/fonts/roboto";
import { buildPath } from "../utils/buildPath";
import type { PatternPart } from "../geometry/SunSkirt";
import { TEXT_STYLES } from "../constants/TextStyles";

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

const MARGIN = 10;

const INNER_WIDTH = A4_WIDTH - MARGIN * 2;
const INNER_HEIGHT = A4_HEIGHT - MARGIN * 2;

function createSvgElement(svgString: string): SVGSVGElement {
  const parser = new DOMParser();

  const doc = parser.parseFromString(svgString, "image/svg+xml");

  return doc.documentElement as unknown as SVGSVGElement;
}

export async function exportPatternToPdf(parts: PatternPart[], bbox: DOMRect) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  pdf.addFileToVFS("Roboto.ttf", robotoBase64);
  pdf.addFont("Roboto.ttf", "Roboto", "normal");
  pdf.setFont("Roboto");

  const cols = Math.ceil(bbox.width / INNER_WIDTH);
  const rows = Math.ceil(bbox.height / INNER_HEIGHT);

  let pageIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pageIndex > 0) {
        pdf.addPage();
      }

      const x = bbox.x + col * INNER_WIDTH;
      const y = bbox.y + row * INNER_HEIGHT;

      const label = `Лист ${col + 1}×${row + 1}`;

      const svgParts = parts
        .map((part) => {
          const shapes = part.shapes
            .map((shape) => {
              switch (shape.kind) {
                case "path": {
                  const path = buildPath(shape.commands);

                  let strokeDasharray = "";

                  if (shape.style === "dashed") {
                    strokeDasharray = `stroke-dasharray="6 4"`;
                  }

                  let strokeWidth = 1;

                  if (shape.style === "thin") {
                    strokeWidth = 0.3;
                  }

                  return `
                    <path
                      d="${path}"
                      stroke="black"
                      fill="none"
                      stroke-width="${strokeWidth}"
                      ${strokeDasharray}
                    />
                  `;
                }

                case "grainline":
                  return `
                    <g>
                      <line
                        x1="${shape.x1}"
                        y1="${shape.y1}"
                        x2="${shape.x2}"
                        y2="${shape.y2}"
                        stroke="black"
                        stroke-width="1"
                      />

                      <polygon
                        points="
                          ${shape.x2},${shape.y2}
                          ${shape.x2 - 3},${shape.y2 - 6}
                          ${shape.x2 + 3},${shape.y2 - 6}
                        "
                        fill="black"
                      />
                    </g>
                  `;
              }
            })
            .join("");

          return `
            <g transform="translate(${part.offsetX}, ${part.offsetY})">
              ${shapes}
            </g>
          `;
        })
        .join("");

      const svgString = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="${INNER_WIDTH}mm"
          height="${INNER_HEIGHT}mm"
          viewBox="${x} ${y} ${INNER_WIDTH} ${INNER_HEIGHT}"
        >

          ${svgParts}

          <!-- граница печатной области -->
          <rect
            x="${x}"
            y="${y}"
            width="${INNER_WIDTH}"
            height="${INNER_HEIGHT}"
            stroke="grey"
            stroke-width="0.3"
            stroke-dasharray="1,1"
            fill="none"
          />

          ${
            pageIndex === 0
              ? `
            <rect
              x="${x + 55}"
              y="${y + 100}"
              width="100"
              height="100"
              stroke="grey"
              stroke-width="0.3"
              fill="none"
            />
          `
              : ""
          }

        </svg>
      `;

      const svgElement = createSvgElement(svgString);

      await pdf.svg(svgElement, {
        x: MARGIN,
        y: MARGIN,
        width: INNER_WIDTH,
        height: INNER_HEIGHT,
      });

      parts.forEach((part) => {
        part.shapes.forEach((shape) => {
          if (shape.kind !== "text") return;

          const textX = shape.x + part.offsetX - x + MARGIN;
          const textY = shape.y + part.offsetY - y + MARGIN;

          // не рисуем текст вне текущего листа
          if (
            textX < MARGIN ||
            textX > A4_WIDTH - MARGIN ||
            textY < MARGIN ||
            textY > A4_HEIGHT - MARGIN
          ) {
            return;
          }

          const fontSize = TEXT_STYLES[shape.style || "label"];

          pdf.setFontSize(fontSize);

          if (shape.rotation) {
            pdf.text(shape.text, textX, textY, {
              angle: -shape.rotation,
            });
          } else {
            pdf.text(shape.text, textX, textY);
          }
        });
      });

      pdf.setFontSize(10);
      pdf.setTextColor(150);

      pdf.text(label, MARGIN + 5, MARGIN + 6);

      if (pageIndex === 0) {
        pdf.text("Тестовый квадрат", 100, 155);
        pdf.text("10×10 см", 107, 165);
      }

      pageIndex++;
    }
  }

  const blobUrl = pdf.output("bloburl");

  window.open(blobUrl, "_blank");
}
