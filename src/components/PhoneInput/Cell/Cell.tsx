type CellProps = {
  value: string;
  /** 1 символ */
  onChange: (number: string) => void;
};

/** Ячейка инпута - содержит максимум 1 цифру */
const PhoneInput: React.FC<CellProps> = () => {
  return <input></input>;
};

export default PhoneInput;
