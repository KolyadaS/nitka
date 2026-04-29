import type { Measurements } from "../../../types/types";
import { SunSkirtForm } from "../../Controls/SunSkirtForm/SunSkirtForm";
import "./Main.css";

interface Props {
  onSubmit: (data: Measurements) => void;
  children: React.ReactNode;
}

export function Main({ onSubmit, children }: Props) {
  return (
    <div className="main">
      <section className="main__params">
        <SunSkirtForm onSubmit={onSubmit} />
      </section>

      {children}
    </div>
  );
}
