import { useEffect, useRef, useState } from "react";
import { Mask } from "@types";
import s from "./PhoneInput.module.scss";
import { Select } from "@components/Select";
import Phone from "@components/Phone";

type PhoneInputProps = {
  masks: Mask[];
  value: string;
  onChange: (number: string) => void;
};

const PhoneInput: React.FC<PhoneInputProps> = ({ masks, value, onChange }) => {
  const [mask, setMask] = useState<Mask>(masks[0]);
  return (
    <div className={s.root}>
      <Select value={mask} onChange={setMask} items={masks} />
      <Phone mask={mask} value={value} onChange={onChange} />
    </div>
  );
};

export default PhoneInput;
