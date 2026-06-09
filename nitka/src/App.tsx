import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Patterns from "./pages/Patterns";
import Skirts from "./pages/women/skirts/Skirts";
import Blouses from "./pages/women/blouses/Blouses";

import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";

export default function App() {
  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patterns" element={<Patterns />} />

        <Route path="/skirts/*" element={<Skirts />} />
        <Route path="/blouses/*" element={<Blouses />} />
      </Routes>

      <Footer />
    </div>
  );
}

// ===================================================================================

// import { useState } from "react";
// import type { PatternPart } from "./core/geometry/SunSkirt";
// import { generateSkirtPattern } from "./core/geometry/SunSkirt";
// import Header from "./components/Layout/Header/Header";
// import Footer from "./components/Layout/Footer/Footer";
// import { Main } from "./components/Layout/Main/Main";
// import { PatternPreview } from "./components/Preview/PatternPreview";
// import { Link, Route, Routes } from "react-router-dom";

// function Home() {
//   return <h2>Главная страница</h2>;
// }

// function Skirts() {
//   return <h2>Выберите желаемую модель юбки</h2>;
// }

// function Blouses() {
//   return <h2>Выберите желаемую модель блузки</h2>;
// }

// export default function App() {
//   // const [pattern, setPattern] = useState<PatternPart[]>([]);

//   return (
//     <div>
//       {/*
//       <Main
//         onSubmit={(data) => {
//           const result = generateSkirtPattern(data);
//           setPattern(result);
//         }}
//       >
//         <PatternPreview parts={pattern} />
//       </Main>/> */}
//       <Header>
//         <nav>
//           <Link to="/">Главная</Link> | <Link to="/skirts">Юбки</Link> |
//           <Link to="/blouses">Блузки</Link>
//         </nav>
//       </Header>
//       <div>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/skirts" element={<Skirts />} />
//           <Route path="/blouses" element={<Blouses />} />
//         </Routes>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// =========================== not work ====================================

// import { Routes, Route, Link } from "react-router-dom";

// function Home() {
//   return <h2>Главная</h2>;
// }

// function SunSkirt() {
//   return <h2>Юбка</h2>;
// }

// export default function App() {
//   return (
//     <div>
//       <nav>
//         <Link to="/">Главная</Link> | <Link to="/skirt">Юбка</Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/skirt" element={<SunSkirt />} />
//       </Routes>
//     </div>
//   );
// }

// ==============================================================================
// import { useState } from "react";
// import type { PatternPart } from "./core/geometry/SunSkirt";
// import { generateSkirtPattern } from "./core/geometry/SunSkirt";
// import Header from "./components/Layout/Header/Header";
// import Footer from "./components/Layout/Footer/Footer";
// import { Main } from "./components/Layout/Main/Main";
// import { PatternPreview } from "./components/Preview/PatternPreview";

// export default function App() {
//   const [pattern, setPattern] = useState<PatternPart[]>([]);

//   return (
//     <div>
//       <Header />

//       <Main
//         onSubmit={(data) => {
//           const result = generateSkirtPattern(data);
//           setPattern(result);
//         }}
//       >
//         <PatternPreview parts={pattern} />
//       </Main>

//       <Footer />
//     </div>
//   );
// }
