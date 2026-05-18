import { useEffect, useState } from "react";
import { Mask } from "@types";
import * as s from "./PhoneInput.module.scss";
import { Select } from "@components/Select";
import Phone from "@components/Phone";
import PhoneStore from "@store/PhoneStore";
import { observer } from "mobx-react-lite";

type PhoneInputProps = {
  masks: Mask[];
  value: string;
  onChange: (number: string) => void;
  disabled?: boolean;
};

const PhoneInput: React.FC<PhoneInputProps> = ({
  masks,
  value,
  onChange,
  disabled,
}) => {
  const [mask, setMask] = useState<Mask>(masks[0]);
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

  if (masks.length === 0) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.title}>Введите номер телефона</div>
      <div className={s.phoneInput}>
        <Select
          value={mask}
          onChange={setMask}
          items={masks}
          disabled={disabled}
          status={store.status}
        />
        <Phone
          mask={mask}
          onChange={onChange}
          disabled={disabled}
          store={store}
          status={store.status}
        />
      </div>
      <div className={s.description}>
        {/* TODO добавить иконки */}
        {store.status === "success" && "Номер телефона введен верно"}
        {store.status === "fail" && "Неправильный номер телефона"}
      </div>
    </div>
  );
};

export default observer(PhoneInput);
