import "./PatternPreview.css";
import type { PathCommand } from "../../types/types";
import { buildPath } from "../../core/utils/buildPath";
import { usePatternBBox } from "../../hooks/usePatternBBox";
import { exportPatternToPdf } from "../../core/export/exportPdf";

const A4_WIDTH = 210;
const A4_HEIGHT = 297;

interface Props {
  commands: PathCommand[];
}

export function PatternPreview({ commands }: Props) {
  const path = buildPath(commands);
  const { ref, bbox } = usePatternBBox(path);

  if (!bbox) {
    return (
      <svg style={{ position: "absolute", opacity: 0 }}>
        <path ref={ref} d={path} />
      </svg>
    );
  }

  const cols = Math.ceil(bbox.width / A4_WIDTH);
  const rows = Math.ceil(bbox.height / A4_HEIGHT);

  return (
    <div className="patternPreview">
      <button
        onClick={() => {
          if (bbox) {
            exportPatternToPdf(path, bbox);
          }
        }}
      >
        Скачать PDF
      </button>

      {/* скрытый SVG */}
      <svg style={{ position: "absolute", opacity: 0 }}>
        <path ref={ref} d={path} />
      </svg>

      {/* превью */}
      <svg
        width="100%"
        viewBox={`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`}
        style={{ border: "1px solid #ccc" }}
      >
        <path
          d={path}
          stroke="black"
          fill="green"
          strokeWidth="1"
          fillOpacity="0.5"
        />

        {Array.from({ length: cols }).map((_, col) =>
          Array.from({ length: rows }).map((_, row) => {
            const x = bbox.x + col * A4_WIDTH;
            const y = bbox.y + row * A4_HEIGHT;

            return (
              <g key={`${col}-${row}`}>
                <rect
                  x={x}
                  y={y}
                  width={A4_WIDTH}
                  height={A4_HEIGHT}
                  fill="none"
                  stroke="red"
                  strokeDasharray="6 4"
                />
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

// ===========================================================================

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
// import { useEffect, useRef, useState } from "react";
// import jsPDF from "jspdf";
// import "svg2pdf.js";
// import { buildPath } from "../../core/utils/buildPath";

// const A4_WIDTH = 210;
// const A4_HEIGHT = 297;

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   // --- строим path ---
//   const path = buildPath(commands);

//   const ref = useRef<SVGPathElement | null>(null);
//   const [bbox, setBbox] = useState<DOMRect | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       setBbox(ref.current.getBBox());
//     }
//   }, [path]);

//   // --- helper: строку SVG → DOM элемент ---
//   function createSvgElement(svgString: string): SVGSVGElement {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(svgString, "image/svg+xml");
//     return doc.documentElement as unknown as SVGSVGElement;
//   }

//   // --- генерация PDF ---
//   const handleDownloadPdf = async () => {
//     try {
//       if (!bbox) {
//         console.warn("bbox ещё не готов");
//         return;
//       }

//       const pdf = new jsPDF({
//         unit: "mm",
//         format: "a4",
//       });

//       const cols = Math.ceil(bbox.width / A4_WIDTH);
//       const rows = Math.ceil(bbox.height / A4_HEIGHT);

//       let pageIndex = 0;

//       for (let row = 0; row < rows; row++) {
//         for (let col = 0; col < cols; col++) {
//           if (pageIndex > 0) pdf.addPage();

//           const x = bbox.x + col * A4_WIDTH;
//           const y = bbox.y + row * A4_HEIGHT;

//           const svgString = `
//             <svg xmlns="http://www.w3.org/2000/svg"
//               width="210mm"
//               height="297mm"
//               viewBox="${x} ${y} ${A4_WIDTH} ${A4_HEIGHT}">

//               <path d="${path}" stroke="black" fill="none"/>

//               <rect x="30" y="30" width="100" height="100"
//                 stroke="grey" fill="none"/>

//             </svg>
//           `;

//           const svgElement = createSvgElement(svgString);

//           // ВАЖНО: ждём
//           await pdf.svg(svgElement, {
//             x: 0,
//             y: 0,
//             width: A4_WIDTH,
//             height: A4_HEIGHT,
//           });

//           pageIndex++;
//         }
//       }

//       // открываем в новой вкладке
//       const blobUrl = pdf.output("bloburl");
//       window.open(blobUrl, "_blank");

//       // если хочешь скачивание вместо открытия:
//       // pdf.save("pattern.pdf");
//     } catch (e) {
//       console.error("PDF generation error:", e);
//       alert("Ошибка при создании PDF, смотри консоль");
//     }
//   };

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>
//     );
//   }

//   const cols = Math.ceil(bbox.width / A4_WIDTH);
//   const rows = Math.ceil(bbox.height / A4_HEIGHT);

//   return (
//     <div className="patternPreview">
//       <button onClick={handleDownloadPdf}>Скачать PDF</button>
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
//         style={{
//           width: "100%",
//           border: "5px solid #ccc",
//           marginTop: "10px",
//         }}
//       >
//         <path
//           d={path}
//           stroke="black"
//           fill="green"
//           strokeWidth="1"
//           fillOpacity="0.5"
//         />

//         {Array.from({ length: cols }).map((_, col) =>
//           Array.from({ length: rows }).map((_, row) => {
//             const x = bbox.x + col * A4_WIDTH;
//             const y = bbox.y + row * A4_HEIGHT;

//             return (
//               <g key={`${col}-${row}`}>
//                 <rect
//                   x={x}
//                   y={y}
//                   width={A4_WIDTH}
//                   height={A4_HEIGHT}
//                   fill="none"
//                   stroke="red"
//                   strokeDasharray="6 4"
//                 />
//                 <text x={x + 5} y={y + 15} fontSize="10" fill="blue">
//                   Лист {col + 1}×{row + 1}
//                 </text>
//               </g>
//             );
//           })
//         )}
//       </svg>
//     </div>
//   );
// }

//===================================================================================================

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
// import { useEffect, useRef, useState } from "react";
// import jsPDF from "jspdf";
// import "svg2pdf.js";

// const A4_WIDTH = 210;
// const A4_HEIGHT = 297;

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   // --- строим path ---
//   const path = commands
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

//   const ref = useRef<SVGPathElement | null>(null);
//   const [bbox, setBbox] = useState<DOMRect | null>(null);

//   // --- считаем bounding box ---
//   useEffect(() => {
//     if (ref.current) {
//       setBbox(ref.current.getBBox());
//     }
//   }, [path]);

//   // --- функция генерации PDF ---
//   const handleDownloadPdf = async () => {
//     if (!bbox) return;

//     const pdf = new jsPDF({
//       unit: "mm",
//       format: "a4",
//     });

//     const cols = Math.ceil(bbox.width / A4_WIDTH);
//     const rows = Math.ceil(bbox.height / A4_HEIGHT);

//     let pageIndex = 0;

//     for (let row = 0; row < rows; row++) {
//       for (let col = 0; col < cols; col++) {
//         if (pageIndex > 0) pdf.addPage();

//         const x = bbox.x + col * A4_WIDTH;
//         const y = bbox.y + row * A4_HEIGHT;

//         const svg = `
//           <svg xmlns="http://www.w3.org/2000/svg"
//             width="210mm"
//             height="297mm"
//             viewBox="${x} ${y} ${A4_WIDTH} ${A4_HEIGHT}">

//             <path d="${path}" stroke="black" fill="none"/>

//             <!-- тест масштаба -->
//             <rect x="10" y="10" width="100" height="10" stroke="red" fill="none"/>

//           </svg>
//         `;

//         await pdf.svg(svg, {
//           x: 0,
//           y: 0,
//           width: A4_WIDTH,
//           height: A4_HEIGHT,
//         });

//         pageIndex++;
//       }
//     }

//     pdf.save("pattern.pdf");
//   };

//   // --- пока нет bbox ---
//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>
//     );
//   }

//   const cols = Math.ceil(bbox.width / A4_WIDTH);
//   const rows = Math.ceil(bbox.height / A4_HEIGHT);

//   return (
//     <div className="patternPreview">
//       {/* кнопка */}
//       <button onClick={handleDownloadPdf}>Скачать PDF</button>

//       {/* скрытый svg для bbox */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>

//       {/* основной превью */}
//       <svg
//         width="100%"
//         viewBox={`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`}
//         style={{ border: "1px solid #ccc", marginTop: "10px" }}
//       >
//         {/* выкройка */}
//         <path
//           d={path}
//           stroke="black"
//           fill="green"
//           strokeWidth="1"
//           fillOpacity="0.5"
//         />

//         {/* сетка A4 */}
//         {Array.from({ length: cols }).map((_, col) =>
//           Array.from({ length: rows }).map((_, row) => {
//             const x = bbox.x + col * A4_WIDTH;
//             const y = bbox.y + row * A4_HEIGHT;

//             return (
//               <g key={`${col}-${row}`}>
//                 <rect
//                   x={x}
//                   y={y}
//                   width={A4_WIDTH}
//                   height={A4_HEIGHT}
//                   fill="none"
//                   stroke="red"
//                   strokeDasharray="6 4"
//                 />
//                 <text x={x + 5} y={y + 15} fontSize="10" fill="red">
//                   {col + 1}×{row + 1}
//                 </text>
//               </g>
//             );
//           })
//         )}
//       </svg>
//     </div>
//   );
// }

// =================================================================================================

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
// import { useEffect, useRef, useState } from "react";

// const A4_WIDTH = 210;
// const A4_HEIGHT = 297;

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   const path = commands
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

//   const ref = useRef<SVGPathElement | null>(null);
//   const [bbox, setBbox] = useState<DOMRect | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       setBbox(ref.current.getBBox());
//     }
//   }, [path]);

//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>
//     );
//   }

//   const cols = Math.ceil(bbox.width / A4_WIDTH);
//   const rows = Math.ceil(bbox.height / A4_HEIGHT);

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG для bbox */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>

//       <svg
//         width="100%" // 👈 ВАЖНО: авто-масштаб
//         viewBox={`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`}
//         style={{ border: "1px solid #ccc" }}
//       >
//         {/* сама выкройка */}
//         <path
//           d={path}
//           stroke="black"
//           fill="green"
//           strokeWidth="1"
//           fillOpacity="0.5"
//         />

//         {/* сетка A4 */}
//         {Array.from({ length: cols }).map((_, col) =>
//           Array.from({ length: rows }).map((_, row) => {
//             const x = bbox.x + col * A4_WIDTH;
//             const y = bbox.y + row * A4_HEIGHT;

//             return (
//               <g key={`${col}-${row}`}>
//                 <rect
//                   x={x}
//                   y={y}
//                   width={A4_WIDTH}
//                   height={A4_HEIGHT}
//                   fill="none"
//                   stroke="red"
//                   strokeDasharray="6 4"
//                 />

//                 <text x={x + 5} y={y + 15} fontSize="10" fill="red">
//                   {col + 1}×{row + 1}
//                 </text>
//               </g>
//             );
//           })
//         )}
//       </svg>
//     </div>
//   );
// }

// =======================================================================================================

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";
// import { useEffect, useRef, useState } from "react";

// const A4_WIDTH = 210;
// const A4_HEIGHT = 297;

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   const path = commands
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

//   const ref = useRef<SVGPathElement | null>(null);
//   const [bbox, setBbox] = useState<DOMRect | null>(null);

//   useEffect(() => {
//     if (ref.current) {
//       setBbox(ref.current.getBBox());
//     }
//   }, [path]);

//   // пока не посчитали bbox — рисуем скрытый SVG
//   if (!bbox) {
//     return (
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>
//     );
//   }

//   const cols = Math.ceil(bbox.width / A4_WIDTH);
//   const rows = Math.ceil(bbox.height / A4_HEIGHT);

//   const pages: { x: number; y: number }[] = [];

//   for (let y = 0; y < rows; y++) {
//     for (let x = 0; x < cols; x++) {
//       pages.push({
//         x: bbox.x + x * A4_WIDTH,
//         y: bbox.y + y * A4_HEIGHT,
//       });
//     }
//   }

//   return (
//     <div className="patternPreview">
//       {/* скрытый SVG для измерения */}
//       <svg style={{ position: "absolute", opacity: 0 }}>
//         <path ref={ref} d={path} />
//       </svg>

//       {/* страницы A4 */}
//       {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}> */}
//       {/* <div style={{ display: "flex", gap: "5px" }}> */}
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "1fr 1fr 1fr 1fr",
//           gap: "3px",
//         }}
//       >
//         {pages.map((p, i) => (
//           <svg
//             key={i}
//             width="210mm"
//             height="297mm"
//             viewBox={`${p.x} ${p.y} ${A4_WIDTH} ${A4_HEIGHT}`}
//           >
//             <path
//               d={path}
//               stroke="black"
//               fill="green"
//               strokeWidth="1"
//               fillOpacity="0.5"
//             />

//             {/* опционально: границы страницы */}
//             <rect
//               x={p.x}
//               y={p.y}
//               width={A4_WIDTH}
//               height={A4_HEIGHT}
//               fill="none"
//               stroke="red"
//               strokeDasharray="4"
//             />

//             <text x="5" y="15" fontSize="6">
//               {i + 1}
//             </text>
//           </svg>
//         ))}
//       </div>
//     </div>
//   );
// }

// ===================================================================================================

// import "./PatternPreview.css";
// import type { PathCommand } from "../../types/types";

// interface Props {
//   commands: PathCommand[];
// }

// export function PatternPreview({ commands }: Props) {
//   const path = commands
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

//   return (
//     <div className="patternPreview">
//       <svg width="400mm" height="600mm" viewBox="0 0 400 600">
//         <path
//           d={path}
//           stroke="black"
//           fill="green"
//           stroke-width="1"
//           fill-opacity="0.5"
//         />
//       </svg>
//     </div>
//   );
// }
