import type { Measurements } from "../../../types/types";
import { useState, type ReactNode } from "react";
import "./Main.css";
import { Button } from "../../Controls/Button/Button";

interface Props {
  onSubmit: (data: Measurements) => void;
  children: ReactNode;
}

export function Main({ onSubmit, children }: Props) {
  const [form, setForm] = useState<Measurements>({
    waist: 70,
    hips: 96,
    length: 60,
    beltWidth: 3,
  });

  return (
    <div className="main">
      <section className="main__params">
        <label>
          Обхват талии =
          <input
            type="number"
            placeholder="Waist"
            value={form.waist}
            onChange={(e) =>
              setForm({ ...form, waist: Number(e.target.value) })
            }
          />
        </label>

        <label>
          Обхват бедер =
          <input
            type="number"
            placeholder="Hips"
            value={form.hips}
            onChange={(e) => setForm({ ...form, hips: Number(e.target.value) })}
          />
        </label>

        <label>
          Длина =
          <input
            type="number"
            placeholder="Length"
            value={form.length}
            onChange={(e) =>
              setForm({ ...form, length: Number(e.target.value) })
            }
          />
        </label>

        <label>
          Ширина пояса=
          <input
            type="number"
            placeholder="Belt width"
            value={form.beltWidth}
            onChange={(e) =>
              setForm({ ...form, beltWidth: Number(e.target.value) })
            }
          />
        </label>

        <Button onClick={() => onSubmit(form)}>Создать выкройку</Button>
      </section>

      {children}
    </div>
  );
}
