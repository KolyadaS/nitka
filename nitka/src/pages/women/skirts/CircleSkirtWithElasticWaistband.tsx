import { useState } from "react";
import type { PatternPart } from "../../../core/geometry/CircleSkirtWithZipper";
import { generateSkirtPattern } from "../../../core/geometry/CircleSkirtWithZipper";
import { Main } from "../../../components/Layout/Main/Main";
import { PatternPreview } from "../../../components/Preview/PatternPreview";

export default function ClassicSkirt() {
  const [pattern, setPattern] = useState<PatternPart[]>([]);
  return (
    <div>
      <Main
        onSubmit={(data) => {
          const result = generateSkirtPattern(data);
          setPattern(result);
        }}
      >
        Тут должна быть юбка-солнце на резинке
        <PatternPreview parts={pattern} />
      </Main>
    </div>
  );
}
