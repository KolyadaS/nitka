import "./Home.css";
import { Button } from "../components/Controls/Button/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <div className="home__hero">
        <h1 className="hero__title">Выкройки по вашим меркам</h1>
        <p className="hero__text">
          Создавайте базовые выкройки под свою фигуру.
        </p>
        <Link to="/patterns">
          <Button className="hero_button">Создать свою выкройку</Button>
        </Link>
      </div>
    </section>
  );
}
