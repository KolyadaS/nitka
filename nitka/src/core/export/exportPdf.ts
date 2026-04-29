import jsPDF from "jspdf";
import "svg2pdf.js";

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

export async function exportPatternToPdf(path: string, bbox: DOMRect) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const cols = Math.ceil(bbox.width / INNER_WIDTH);
  const rows = Math.ceil(bbox.height / INNER_HEIGHT);

  let pageIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pageIndex > 0) pdf.addPage();

      const x = bbox.x + col * INNER_WIDTH;
      const y = bbox.y + row * INNER_HEIGHT;

      const label = `List ${col + 1}×${row + 1}`;

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="210mm"
          height="297mm"
          viewBox="${x} ${y} ${INNER_WIDTH} ${INNER_HEIGHT}">
          
          <path d="${path}" stroke="black" fill="none"/>

          <!-- рамка рабочей области (для печати) -->
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

          <!-- тестирование масштаба -->
          <rect x="55" y="100" width="100" height="100"
                stroke="grey" stroke-width="0.3" fill="none"/>
          <text x="95" y="150" font-size="5" fill="grey">
                10×10cm
          </text>

          <!-- подпись листов -->
          <text x="${x + 5}" y="${y + 15}"
                font-size="12" fill="grey">
                ${label}
          </text>

        </svg>
      `;

      const svgElement = createSvgElement(svgString);

      await pdf.svg(svgElement, {
        x: MARGIN,
        y: MARGIN,
        width: INNER_WIDTH,
        height: INNER_HEIGHT,
      });

      pageIndex++;
    }
  }

  const blobUrl = pdf.output("bloburl");
  window.open(blobUrl, "_blank");
}
