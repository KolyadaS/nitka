import jsPDF from "jspdf";
import "svg2pdf.js";
import { robotoBase64 } from "../../assets/fonts/roboto";
import { buildPath } from "../utils/buildPath";
import type { PatternPart } from "../geometry/SunSkirt";

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
      if (pageIndex > 0) pdf.addPage();

      const x = bbox.x + col * INNER_WIDTH;
      const y = bbox.y + row * INNER_HEIGHT;

      const label = `Лист ${row + 1}×${col + 1}`;

      // рисуем части с transform
      const svgParts = parts
        .map(
          (part) => `
            <g transform="translate(${part.offsetX}, ${part.offsetY})">
              <path d="${buildPath(part.commands)}"
                stroke="black"
                fill="none"
                stroke-width="0.5"/>
            </g>
          `
        )
        .join("");

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="210mm"
          height="297mm"
          viewBox="${x} ${y} ${INNER_WIDTH} ${INNER_HEIGHT}">

          ${svgParts}

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

          <!-- тест масштаба -->
          <rect x="55" y="100" width="100" height="100"
                stroke="grey" stroke-width="0.3" fill="none"/>
        </svg>
      `;

      const svgElement = createSvgElement(svgString);

      await pdf.svg(svgElement, {
        x: MARGIN,
        y: MARGIN,
        width: INNER_WIDTH,
        height: INNER_HEIGHT,
      });

      // текст
      pdf.setFontSize(10);
      pdf.setTextColor(150);

      pdf.text(label, MARGIN + 5, MARGIN + 10);

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
