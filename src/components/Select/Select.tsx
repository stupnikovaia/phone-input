import { useCallback, useRef, useState } from "react";

import { observer } from "mobx-react-lite";
import { Mask } from "@types";
import s from "./Select.module.scss";
import cn from "clsx";
import { useClickOutside } from "@hooks";

type SelectProps = {
  value: Mask;
  onChange: (item: Mask) => void;
  items: Mask[];
};

const Select: React.FC<SelectProps> = ({ value, items, onChange }) => {
  const buttonRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleClickOutside = useCallback(() => {
    if (open) setOpen(false);
  }, [open]);

  useClickOutside({
    refs: [listRef, buttonRef],
    cb: handleClickOutside,
  });

  return (
    <div className={s.select}>
      <button
        className={cn(s.current, open && s.active)}
        onClick={() => {
          setOpen((open) => !open);
        }}
        ref={buttonRef}
      >
        {value.emoji} {value.prefix} {value.name}
      </button>
      <div ref={listRef} className={cn(s.list, open && s.open)}>
        {items.map((mask) => (
          <div
            className={cn(value.key === mask.key && s.active, s.item)}
            onClick={() => onChange(mask)}
          >
            {mask.emoji} {mask.prefix} {mask.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Select);
