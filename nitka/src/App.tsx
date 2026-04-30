import { useState } from "react";
import type { PatternPart } from "./core/geometry/SunSkirt";
import { generateSkirtPattern } from "./core/geometry/SunSkirt";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import { Main } from "./components/Layout/Main/Main";
import { PatternPreview } from "./components/Preview/PatternPreview";

export default function App() {
  const [pattern, setPattern] = useState<PatternPart[]>([]);

  return (
    <div>
      <Header />

      <Main
        onSubmit={(data) => {
          const result = generateSkirtPattern(data);
          setPattern(result);
        }}
      >
        <PatternPreview parts={pattern} />
      </Main>

      <Footer />
    </div>
  );
}
