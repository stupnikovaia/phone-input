import { describe, expect, test } from "@jest/globals";
import PhoneStore from "../store/PhoneStore";

describe("Phone Store", () => {
  test("Full Phone", () => {
    const phone = "+8439203";
    const prefix = "+84";
    const mask = "(**) * _*__**";
    const store = new PhoneStore({ phone, prefix, mask });

    store.fullPhone;

    expect(store.fullPhone).toBe("+84 (39) 2 _0__3*");
  });
});
