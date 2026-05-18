import { action, makeObservable, observable } from "mobx";

import {
  findPhonePositions,
  NUMBER_REGEX,
  setFullPhoneToMask,
} from "../../utils";
import { ValidateStatus } from "@types";

type PrivateFields = "_phone" | "_prefix" | "_mask" | "_status";

type PhoneStoreProps = {
  phone: string;
  prefix: string;
  mask: string;
};

class PhoneStore {
  private _phone: string = "";
  private _prefix: string = "";
  private _status: ValidateStatus = "pending";

  // отображение индексов цифр номера в номер (на каких позициях */цифра)
  private _map: number[];

  // NOTE можно сделать так, что за размер массива и количество input отвечает количество * в mask
  private _mask: string = "";
  constructor({ phone, prefix, mask }: PhoneStoreProps) {
    makeObservable<PhoneStore, PrivateFields>(this, {
      _prefix: observable,
      _phone: observable,
      _mask: observable,
      _status: observable,

      setPhone: action,
      setNumber: action,
      deleteNumber: action,
      updateStatus: action,
    });
    this._prefix = prefix;
    this._mask = mask;
    this._phone = setFullPhoneToMask(mask, phone, prefix);
    this._map = findPhonePositions(mask);
  }

  /** Возвращает номер из массива в соответствии с маской
   * NOTE: понять, нужно ли вообще триггерить onChange если номер не фулловый, как будто нет
   */
  get phone(): string {
    return this._phone;
  }

  get fullPhone(): string {
    return `${this._prefix} ${this._phone}`;
  }

  get firstEmptyIdx(): number | null {
    const idx = this._phone.indexOf("*");
    return idx > 0 ? idx : null;
  }

  get firstNonEmptyIdx(): number | null {
    const re = /[0-9]/g;
    re.exec(this._phone);
    [...this._phone].reverse().join("").search(NUMBER_REGEX);
    const idx =
      this._phone.length -
      [...this._phone].reverse().join("").search(NUMBER_REGEX) -
      1;
    return idx > 0 ? idx : null;
  }

  get map() {
    return this._map;
  }

  get status() {
    return this._status;
  }

  setPhone(phone: string) {
    this._phone = phone;
  }

  /** Вставляет новую цифру на позицию idx */
  setNumber(number: string, idx: number) {
    const phone = [...this._phone];
    phone[idx] = number;
    this._phone = phone.join("");
  }

  /** Удаляет цифру с позиции idx, все остальные цифры сдвигаются */
  deleteNumber(idx: number) {
    if (this._phone[idx] === "*") {
      return;
    }
    const newPhone = [...this._phone];
    newPhone[idx] = "*";

    this._map
      .map((idx) => newPhone[idx])
      .sort((a, b) => {
        if (a === "*" && b.match(/[0-9]/)) return 1;
        if (a.match(/[0-9]/) && b === "*") return -1;
        return 0;
      })
      .forEach((ch, idx) => (newPhone[this._map[idx]] = ch));

    this._phone = newPhone.join("");
  }

  updateStatus = () => {
    // NOTE: насколько я знаю, валидировать номера это трудная задача,
    // так что просто проверяю, что номер полностью заполнен
    if (this.fullPhone.match(/^[^*]*$/)) {
      this._status = "success";
    } else {
      this._status = "fail";
    }
  };

  resetStatus() {
    this._status = "pending";
  }

  destroy() {
    return;
  }
}

export default PhoneStore;
