export const NUMBER_REGEX = /[0-9]/g;

/** Записывает строку цифр в массив, игнорируя все остальные символы */
const parsePhoneToArr = (phone: string): string[] => {
  return phone.match(NUMBER_REGEX);
};

const extractPrefix = (prefix: string, phone: string) => {
  const prefixNums = parsePhoneToArr(prefix);
  const phoneNums = parsePhoneToArr(phone);

  return phoneNums.join("").replace(prefixNums.join(""), "");
};

/** Устанавливает фулл номер в маску
 * прим. "(***) **", "1234" -> "(123) 4*"
 */
export const setFullPhoneToMask = (
  mask: string,
  phone: string,
  prefix: string,
) => {
  let phIdx = 0;
  const numbers = parsePhoneToArr(extractPrefix(prefix, phone));

  return [...mask]
    .map((ch) => {
      if (ch.match(/[*]/) && numbers[phIdx] !== undefined) {
        return numbers[phIdx++];
      }
      return ch;
    })
    .join("");
};

// метод, который находит индексы * в массиве
//  (***) - *** - ** - **
export const findPhonePositions = (mask: string): number[] => {
  return [...mask]
    .map((ch, idx) => {
      if (ch.match(/\*/)) {
        return idx;
      }
      return null;
    })
    .filter((ch) => ch !== null);
};
