import { Link, Routes, Route } from "react-router-dom";
import CircleSkirtWithZipper from "./CircleSkirtWithZipper";
import CircleSkirtWithElasticWaistband from "./CircleSkirtWithElasticWaistband";

function SkirtsHome() {
  return (
    <div>
      <h1>Юбки</h1>

      <ul>
        <li>
          <Link to="circle-with-zipper">Юбка-солнце с застежкой-молнией</Link>
        </li>

        <li>
          <Link to="circle-with-elastic-waistband">Юбка-солнце на резинке</Link>
        </li>
      </ul>
    </div>
  );
}

export default function Skirts() {
  return (
    <Routes>
      <Route path="/" element={<SkirtsHome />} />
      <Route path="circle-with-zipper" element={<CircleSkirtWithZipper />} />
      <Route
        path="circle-with-elastic-waistband"
        element={<CircleSkirtWithElasticWaistband />}
      />
    </Routes>
  );
}
