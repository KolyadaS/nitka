const A4_WIDTH = 210;
const A4_HEIGHT = 297;

interface Props {
  bbox: DOMRect;
}

export function A4Grid({ bbox }: Props) {
  const cols = Math.ceil(bbox.width / A4_WIDTH);
  const rows = Math.ceil(bbox.height / A4_HEIGHT);

  return (
    <>
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

              <text x={x + 5} y={y + 15} fontSize="10" fill="red">
                Лист {col + 1}×{row + 1}
              </text>
            </g>
          );
        })
      )}
    </>
  );
}
