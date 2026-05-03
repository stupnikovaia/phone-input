import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import PhoneStore from "@store/PhoneStore";
import { observer } from "mobx-react-lite";

type Mask = {
  /** Уникальный ключ маски */
  key: string;
  /** Название страны */
  name: string;
  emoji: string;
  /** Префикс для маски (например +7) */
  prefix: string;
  /** Маска для ввода (например '(***) - *** - ** - **') */
  mask: string;
};

// type PhoneInputProps = {
//   masks: Mask[];
//   value: string;
//   onChange: (number: string) => void;
// };

type PhoneInputProps = {
  mask: Mask;
  value: string;
  onChange: (number: string) => void;
};

/** Этот компонент отвечает за одну маску и отображает ее,
 * переключение и префикс на другом уровне */
const PhoneInput: React.FC<PhoneInputProps> = ({ mask, value }) => {
  const [store, setStore] = useState<PhoneStore>(
    () =>
      new PhoneStore({
        phone: value,
        prefix: mask.prefix,
        emoji: mask.emoji,
        mask: mask.mask,
      }),
  );

  useEffect(() => {
    console.log("eff");
    setStore(
      new PhoneStore({
        phone: value,
        prefix: mask.prefix,
        emoji: mask.emoji,
        mask: mask.mask,
      }),
    );
    return () => store.destroy();
  }, [mask]);

  // 1 3 7
  let refs = useRef<Record<number, HTMLInputElement>>({});

  return (
    <div>
      {[...mask.mask].map((char, idx) => {
        if (char === "*")
          return (
            <Cell
              key={idx}
              ref={(ref) => {
                refs.current[idx] = ref;
              }}
              value={store.phone[idx] === "*" ? "" : store.phone[idx]}
              onChange={(value) => {
                if (value !== "") {
                  store.setNumber(value, idx);
                  refs.current[store.firstEmptyIdx]?.focus();
                } else {
                  store.deleteNumber(idx);
                }
              }}
            ></Cell>
          );
        // TODO создать компонент для красивого вывода char
        return char;
      })}
    </div>
  );
};

export default observer(PhoneInput);
