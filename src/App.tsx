import { Select } from "@components/Select";
import classes from "./App.module.scss";
import PhoneInput from "./components/Phone";
import { Mask } from "@types";
import { useState } from "react";
import s from "./App.module.scss";

// +213 6 12345678
const MASKS = [
  {
    key: "ru",
    name: "Россия",
    emoji: "🇷🇺",
    prefix: "+7",
    mask: "(***) - *** - ** - **",
  },
  {
    key: "dz",
    name: "Алжир",
    emoji: "🇩🇿",
    prefix: "+213",
    mask: "* ********",
  },
];

export default function App() {
  const [mask, setMask] = useState<Mask>(MASKS[0]);
  return (
    <div className={s.root}>
      <Select value={mask} onChange={setMask} items={MASKS} />
      <PhoneInput mask={mask} value={""} onChange={console.log} />
    </div>
  );
}
