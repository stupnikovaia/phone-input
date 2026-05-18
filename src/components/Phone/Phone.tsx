import { useEffect, useRef, useState } from "react";
import Cell from "./Cell";
import PhoneStore from "@store/PhoneStore";
import { observer } from "mobx-react-lite";
import { Mask, ValidateStatus } from "@types";
import * as s from "./Phone.module.scss";
import cn from "clsx";

type PhoneProps = {
  store: PhoneStore;
  mask: Mask;
  onChange: (number: string) => void;
  disabled?: boolean;
  status: ValidateStatus;
};

/** Этот компонент отвечает за одну маску и отображает ее,
 * переключение и префикс на другом уровне */
const Phone: React.FC<PhoneProps> = ({
  mask,
  onChange,
  disabled,
  status,
  store,
}) => {
  let refs = useRef<Record<number, HTMLInputElement>>({});

  return (
    <>
      {[...mask.mask].map((char, idx) => {
        if (char === "*")
          return (
            <Cell
              key={idx}
              className={cn(
                s.cell,
                disabled && s.disabled,
                status === "fail" && s.fail,
                status === "success" && s.success,
              )}
              ref={(ref) => {
                refs.current[idx] = ref;
              }}
              value={store.phone[idx] === "*" ? "" : store.phone[idx]}
              onChange={(value) => {
                store.resetStatus();
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
              onEnter={store.updateStatus}
            />
          );
        if (char === " ") return null;
        return <div>{char}</div>;
      })}
    </>
  );
};

export default observer(Phone);
