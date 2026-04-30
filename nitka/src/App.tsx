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

// ==========================================================================================================

// import "./App.css";
// import { useState } from "react";
// import { Main } from "./components/Layout/Main/Main";
// import { PatternPreview } from "./components/Preview/PatternPreview";
// import type { PathCommand } from "./types/types";
// import { generateSkirtPattern } from "./core/geometry/SunSkirt";
// import Header from "./components/Layout/Header/Header";
// import Footer from "./components/Layout/Footer/Footer";

// export default function App() {
//   const [pattern, setPattern] = useState<PathCommand[]>([]);

//   return (
//     <div>
//       <Header></Header>

//       <Main
//         onSubmit={(data) => {
//           const result = generateSkirtPattern(data);
//           setPattern(result);
//         }}
//       >
//         <PatternPreview commands={pattern} />
//       </Main>

//       {/* <PatternPreview commands={pattern} /> */}

//       <Footer></Footer>
//     </div>
//   );
// }
