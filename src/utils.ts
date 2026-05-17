export const NUMBER_REGEX = /[0-9]/g;

const parsePhoneToArr = (phone: string): string[] => {
  return phone.match(NUMBER_REGEX);
};

// метод, который находит индексы * в массиве
//  (***) - *** - ** - **
// и далее просто проходимся по этому массиву и сетим на позицию i цифру и получаем новую строку.

/** Устанавливает номер в маску, длина массива не больше 10 */
const setPhoneToMask = (mask: string, phone: string[]) => {
  let phIdx = 0;
  return [...mask]
    .map((ch, idx) => {
      if (ch.match(/[0-9]/) && phone[phIdx] !== null) {
        return phone[phIdx++];
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
