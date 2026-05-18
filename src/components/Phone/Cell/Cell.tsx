import { NUMBER_REGEX } from "../../../utils";
import { forwardRef } from "react";
import * as s from "./Cell.module.scss";
import cn from "clsx";

type CellProps = {
  value: string;
  /** 1 символ */
  onChange: (number: string) => void;
  goToNext: () => void;
  goToPrev: () => void;
  onEnter: () => void;
  className?: string;
};

const DIGITS_SET = new Set(
  Array.from({ length: 10 }).map((_item, i) => `Digit${i}`),
);

/** Ячейка инпута - содержит максимум 1 цифру */
const Cell = forwardRef<HTMLInputElement, CellProps>(
  (
    { value, onChange, goToNext, goToPrev, onEnter, className }: CellProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        onEnter();
      }

      if (e.code === "Backspace") {
        onChange("");
      }
      if (e.code === "ArrowLeft") {
        goToPrev();
      }
      if (e.code === "ArrowRight") {
        goToNext();
      }
      if (DIGITS_SET.has(e.code)) {
        onChange(e.code.split("Digit")[1]);
      }
    };
    return (
      <input
        type="number"
        value={value}
        onKeyDown={handleKeyDown}
        ref={ref}
        className={className}
        min={0}
        max={9}
      />
    );
  },
);

export default Cell;
