import classes from "./App.module.scss";
import PhoneInput from "./components/PhoneInput";

export default function App() {
  return (
    <PhoneInput
      mask={{
        key: "key1",
        /** Название страны */
        name: "Россия",
        emoji: "э",
        /** Префикс для маски (например +7) */
        prefix: "+7",
        /** Маска для ввода (например '(***) - *** - ** - **') */
        mask: "(***) - *** - ** - **",
      }}
      value={""}
      onChange={function (number: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
