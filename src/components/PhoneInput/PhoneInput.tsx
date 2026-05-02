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

type PhoneInputProps = {
  masks: Mask[];
  value: string;
  onChange: (number: string) => void;
};

const PhoneInput: React.FC<PhoneInputProps> = () => {
  return <input></input>;
};

export default PhoneInput;
