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

// import type { Measurements } from "../../../types/types";
// import { useState, type ReactNode } from "react";
// import "./Main.css";
// import { SunSkirtForm } from "../../Controls/SunSkirtForm/SunSkirtForm";

// interface Props {
//   onSubmit: (data: Measurements) => void;
//   children: ReactNode;
// }

// export function Main({ onSubmit, children }: Props) {
//   const [form, setForm] = useState<Measurements>({
//     waist: 70,
//     hips: 96,
//     length: 60,
//     beltWidth: 3,
//   });

//   return (
//     <div className="main">
//       <SunSkirtForm onSubmit={onSubmit} />

//       {children}
//     </div>
//   );
// }
