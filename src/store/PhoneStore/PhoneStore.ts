import { makeObservable, observable } from "mobx";

type PrivateFields = "_phone" | "_name" | "_emoji" | "_activeIdx" | "_mask";

type PhoneStoreProps = {
  phone: string;
  name: string;
  emoji: string;
  mask: string;
};

class PhoneStore {
  private _phone: Array<string | null> = Array(10).fill(null);
  private _name: string;
  private _emoji: string;
  // TODO подумать нужен ли activeIdx на уровне стора, ведь он отвечает за focus который скорее на уровне элемента где-нибудь в хуке,
  // в данных он никак не играет, только если не брать activeIdx вместо передачи параметром
  private _activeIdx: number;
  // NOTE можно сделать так, что за размер массива и количество input отвечает количество * в mask
  private _mask: string;
  constructor({ phone, name, emoji, mask }: PhoneStoreProps) {
    makeObservable<PhoneStore, PrivateFields>(this, {
      _phone: observable.ref,
      _name: observable,
      _emoji: observable,
      _activeIdx: observable,
      _mask: observable,
    });
    this._phone = parsePhoneToArr(phone);
    this._name = name;
    this._emoji = emoji;
    this._mask = mask;
  }

  /** Возвращает номер из массива в соответствии с маской
   * NOTE: понять, нужно ли вообще триггерить onChange если номер не фулловый, как будто нет
   */
  get phone(): string {
    return `${this._name} ${setPhoneToMask(this._mask, this._phone)}`;
  }

  get activeIdx(): number {
    return this._activeIdx;
  }

  /** Устанавливает номер телефона в массив */
  setPhone(phone: string) {
    this._phone = parsePhoneToArr(phone);
  }

  /** Вставляет новую цифру на позицию idx */
  // TODO check как mobx с этим работает если будет observable.ref, мб надо будет пересоздавать массив
  setNumber(number: string, idx: number) {
    this._phone[idx] = number;
  }

  /** Удаляет цифру с позиции idx, все остальные цифры сдвигаются */
  deleteNumber(idx: number) {
    const newPhone = [...this._phone, null].splice(idx, 1);
    this._phone = newPhone;
  }

  setActiveIdx(idx: number) {
    this._activeIdx = idx;
  }

  destroy() {
    return;
  }
}
