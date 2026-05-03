import { action, makeObservable, observable } from "mobx";

import { findPhonePositions } from "../../utils";

type PrivateFields =
  | "_phone"
  | "_prefix"
  | "_emoji"
  | "_activeIdx"
  | "_mask"
  | "_phoneLength";

type PhoneStoreProps = {
  phone: string;
  prefix: string;
  emoji: string;
  mask: string;
};

class PhoneStore {
  private _phone: string = "";
  private _phoneLength: number = null;
  private _prefix: string = "";
  private _emoji: string = "";
  // отображение индексов цифр номера в номер (на каких позициях */цифра)
  private _map: number[];
  // TODO подумать нужен ли activeIdx на уровне стора, ведь он отвечает за focus который скорее на уровне элемента где-нибудь в хуке,
  // в данных он никак не играет, только если не брать activeIdx вместо передачи параметром
  private _activeIdx: number = null;
  // NOTE можно сделать так, что за размер массива и количество input отвечает количество * в mask
  private _mask: string = "";
  constructor({ phone, prefix, emoji, mask }: PhoneStoreProps) {
    makeObservable<PhoneStore, PrivateFields>(this, {
      _prefix: observable,
      _phone: observable,
      _emoji: observable,
      _activeIdx: observable,
      _mask: observable,
      _phoneLength: observable,

      setPhone: action,
      setNumber: action,
      deleteNumber: action,
      setActiveIdx: action,
    });
    this._prefix = prefix;
    this._emoji = emoji;
    this._mask = mask;
    this._phoneLength = mask.matchAll(/\*/g).toArray().length;
    // TODO инитить чем-то другим - утила которая парсит номер телефона в маску
    this._phone = mask;
    this._map = findPhonePositions(mask);
  }

  /** Возвращает номер из массива в соответствии с маской
   * NOTE: понять, нужно ли вообще триггерить onChange если номер не фулловый, как будто нет
   */
  get phone(): string {
    return this._phone;
  }

  get phoneLength(): number {
    return this._phoneLength;
  }

  get activeIdx(): number {
    return this._activeIdx;
  }

  get firstEmptyIdx(): number | null {
    const idx = this._phone.indexOf("*");
    return idx > 0 ? idx : null;
  }

  get map() {
    return this._map;
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
    const newPhone = [...this._phone];
    newPhone[idx] = "*";

    this._map
      .map((idx) => this._phone[idx])
      .sort((a, b) => {
        // if (a === "*" && b === "*") return 0;
        if (a === "*" && b.match(/[0-9]/)) return 1;
        if (a.match(/[0-9]/) && b === "*") return -1;
        return 0;
      })
      .filter((x) => x !== "*")
      .forEach((ch, idx) => (newPhone[this._map[idx]] = ch));

    this._phone = newPhone.join("");
  }

  setActiveIdx(idx: number) {
    this._activeIdx = idx;
  }

  destroy() {
    return;
  }
}

export default PhoneStore;
