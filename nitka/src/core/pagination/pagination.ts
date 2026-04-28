export const A4_WIDTH = 210;
export const A4_HEIGHT = 297;

export type Page = {
  x: number;
  y: number;
};

export function getPages(width: number, height: number): Page[] {
  const pages: Page[] = [];

  const cols = Math.ceil(width / A4_WIDTH);
  const rows = Math.ceil(height / A4_HEIGHT);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      pages.push({
        x: x * A4_WIDTH,
        y: y * A4_HEIGHT,
      });
    }
  }

  return pages;
}