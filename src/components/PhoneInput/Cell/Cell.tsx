import { ChangeEvent, forwardRef, Ref, useState } from "react";

type CellProps = {
  value: string;
  /** 1 символ */
  onChange: (number: string) => void;
};

/** Ячейка инпута - содержит максимум 1 цифру */
const Cell = forwardRef<HTMLInputElement, CellProps>(
  (
    { value, onChange }: CellProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const handleChange = (
      e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => {
      // console.log(e.target.value);
      // console.log("value", value);
      onChange(e.target.value.at(-1) ?? "");
    };
    return (
      <input type="number" value={value} onChange={handleChange} ref={ref} />
    );
  },
);

export default Cell;
