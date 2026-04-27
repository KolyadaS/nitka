import type { Measurements } from "../../../types/types";
import { useState } from "react";
import "./Main.css";

interface Props {
  onSubmit: (data: Measurements) => void;
}

export function Main({ onSubmit }: Props) {
  const [form, setForm] = useState<Measurements>({
    waist: 70,
    hips: 96,
    length: 60,
  });

  return (
    <div className="main">
      <label>
        Waist =
        <input
          type="number"
          placeholder="Waist"
          value={form.waist}
          onChange={(e) => setForm({ ...form, waist: Number(e.target.value) })}
        />
      </label>

      <label>
        Hips =
        <input
          type="number"
          placeholder="Hips"
          value={form.hips}
          onChange={(e) => setForm({ ...form, hips: Number(e.target.value) })}
        />
      </label>

      <label>
        Length =
        <input
          type="number"
          placeholder="Length"
          value={form.length}
          onChange={(e) => setForm({ ...form, length: Number(e.target.value) })}
        />
      </label>

      <button onClick={() => onSubmit(form)}>Generate</button>
    </div>
  );
}
