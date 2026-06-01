import { Link } from "react-router-dom";

export default function Blouses() {
  return (
    <div>
      <h1>Блузки</h1>

      <ul>
        <li>
          <Link to="/blouses/blouse1">Блузка 1</Link>
        </li>

        <li>
          <Link to="/blouses/blouse2">Блузка 2</Link>
        </li>
      </ul>
    </div>
  );
}
