import { useCallback, useEffect, useRef, useState } from "react";

import { observer } from "mobx-react-lite";
import { Mask, ValidateStatus } from "@types";
import * as s from "./Select.module.scss";
import cn from "clsx";
import { useClickOutside } from "@hooks";

type SelectProps = {
  value: Mask;
  onChange: (item: Mask) => void;
  items: Mask[];
  disabled: boolean;
  status: ValidateStatus;
};

const Select: React.FC<SelectProps> = ({
  value,
  items,
  onChange,
  disabled,
  status,
}) => {
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

  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);

  return (
    <div className={s.select}>
      <button
        className={cn(
          s.current,
          open && s.active,
          disabled && s.disabled,
          status === "fail" && s.fail,
          status === "success" && s.success,
        )}
        onClick={() => {
          setOpen((open) => !open);
        }}
        ref={buttonRef}
      >
        {value.emoji} {value.prefix}
      </button>
      <div ref={listRef} className={cn(s.list, open && s.open)}>
        {items.map((mask) => (
          <div
            className={cn(value.key === mask.key && s.active, s.item)}
            onClick={() => onChange(mask)}
          >
            {mask.emoji} {mask.prefix}{" "}
            <span className={s.name}>{mask.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(Select);
