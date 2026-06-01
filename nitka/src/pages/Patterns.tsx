import { Link } from "react-router-dom";
import "./Patterns.css";

export default function Patterns() {
  return (
    <div className="patterns__category">
      <h2 className="category__title">Женские</h2>
      <div className="category__grid">
        <Link to="/skirts" className="category__card">
          Юбки
        </Link>
        <Link to="/blouses" className="category__card">
          Блузки
        </Link>
      </div>

      <div className="patterns__category">
        <h2 className="category__title">Мужские</h2>
      </div>

      <div className="patterns__category">
        <h2 className="category__title">Детские</h2>
      </div>
    </div>
  );
}
