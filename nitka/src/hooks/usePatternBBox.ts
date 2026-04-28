import { useEffect, useRef, useState } from "react";

export function usePatternBBox(path: string) {
  const ref = useRef<SVGPathElement | null>(null);
  const [bbox, setBbox] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (ref.current) {
      setBbox(ref.current.getBBox());
    }
  }, [path]);

  return { ref, bbox };
}