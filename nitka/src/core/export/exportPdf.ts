import jsPDF from "jspdf";
import "svg2pdf.js";

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

function createSvgElement(svgString: string): SVGSVGElement {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  return doc.documentElement as unknown as SVGSVGElement;
}

export async function exportPatternToPdf(
  path: string,
  bbox: DOMRect
) {
  const pdf = new jsPDF({
    unit: "mm",
    format: "a4",
  });

  const cols = Math.ceil(bbox.width / A4_WIDTH);
  const rows = Math.ceil(bbox.height / A4_HEIGHT);

  let pageIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pageIndex > 0) pdf.addPage();

      const x = bbox.x + col * A4_WIDTH;
      const y = bbox.y + row * A4_HEIGHT;

      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg"
          width="210mm"
          height="297mm"
          viewBox="${x} ${y} ${A4_WIDTH} ${A4_HEIGHT}">
          
          <path d="${path}" stroke="black" fill="none"/>

          <!-- тест масштаба -->
          <rect x="10" y="10" width="100" height="10"
            stroke="red" fill="none"/>

        </svg>
      `;

      const svgElement = createSvgElement(svgString);

      await pdf.svg(svgElement, {
        x: 0,
        y: 0,
        width: A4_WIDTH,
        height: A4_HEIGHT,
      });

      pageIndex++;
    }
  }

  // открываем PDF
  const blobUrl = pdf.output("bloburl");
  window.open(blobUrl, "_blank");
}