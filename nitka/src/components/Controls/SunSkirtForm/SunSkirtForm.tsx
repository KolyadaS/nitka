import { useState } from "react";
import type { Measurements } from "../../../types/types";
import { Button } from "../Button/Button";
import "./SunSkirtForm.css";

interface Props {
  onSubmit: (data: Measurements) => void;
}

export function SunSkirtForm({ onSubmit }: Props) {
  const [form, setForm] = useState<Measurements>({
    waist: 700,
    hips: 960,
    length: 600,
    beltWidth: 30,
  });

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <h2 className="form__title">Юбка-солнце</h2>

      <label className="form__field">
        <span>Обхват талии (мм)</span>
        <input
          type="number"
          value={form.waist}
          onChange={(e) => setForm({ ...form, waist: Number(e.target.value) })}
        />
      </label>

      <label className="form__field">
        <span>Обхват бедер (мм)</span>
        <input
          type="number"
          value={form.hips}
          onChange={(e) => setForm({ ...form, hips: Number(e.target.value) })}
        />
      </label>

      <label className="form__field">
        <span>Длина (мм)</span>
        <input
          type="number"
          value={form.length}
          onChange={(e) => setForm({ ...form, length: Number(e.target.value) })}
        />
      </label>

      <label className="form__field">
        <span>Ширина пояса (мм)</span>
        <input
          type="number"
          value={form.beltWidth}
          onChange={(e) =>
            setForm({ ...form, beltWidth: Number(e.target.value) })
          }
        />
      </label>

      <Button type="submit">Создать выкройку</Button>
    </form>
  );
}
