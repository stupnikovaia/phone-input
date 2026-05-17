import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import PhoneStore from "@store/PhoneStore";
import { observer } from "mobx-react-lite";
import { Mask } from "@types";

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
const PhoneInput: React.FC<PhoneInputProps> = ({ mask, value, onChange }) => {
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

  let refs = useRef<Record<number, HTMLInputElement>>({});

  return (
    <>
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
                  refs.current[store.map[store.map.indexOf(idx) + 1]]?.focus();
                  if (store.firstEmptyIdx === null) {
                    onChange(store.fullPhone);
                  }
                } else {
                  store.deleteNumber(idx);
                  refs.current[store.map[store.map.indexOf(idx) - 1]]?.focus();
                }
              }}
              goToNext={() => {
                // TODO поменять эту шизофрению на что-то получше
                refs.current[store.map[store.map.indexOf(idx) + 1]]?.focus();
              }}
              goToPrev={() => {
                refs.current[store.map[store.map.indexOf(idx) - 1]]?.focus();
              }}
            ></Cell>
          );
        // TODO создать компонент для красивого вывода char
        return char;
      })}
    </>
  );
};

export default observer(PhoneInput);
