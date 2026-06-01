import "./Header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <nav className="header__navigation">
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/patterns">Выкройки</NavLink>
        <NavLink to="/measurements">Как снять мерки</NavLink>
        <NavLink to="/about">О проекте</NavLink>
      </nav>
    </header>
  );
}
