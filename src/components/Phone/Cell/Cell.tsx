import { NUMBER_REGEX } from "../../../utils";
import { ChangeEvent, forwardRef, Ref, useState } from "react";
import s from "./Cell.module.scss";

type CellProps = {
  value: string;
  /** 1 символ */
  onChange: (number: string) => void;
  goToNext: () => void;
  goToPrev: () => void;
};

const DIGITS_SET = new Set(
  Array.from({ length: 10 }).map((_item, i) => `Digit${i}`),
);

/** Ячейка инпута - содержит максимум 1 цифру */
const Cell = forwardRef<HTMLInputElement, CellProps>(
  (
    { value, onChange, goToNext, goToPrev }: CellProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      console.log(e.code);
      // TODO вообще переделать все как keydown, handleChange не нужен
      // NOTE обрабаываем как стирание
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
        className={s.cell}
        min={0}
        max={9}
      />
    );
  },
);

export default Cell;
