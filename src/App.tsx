import PhoneInput from "@components/PhoneInput";

const MASKS = [
  {
    key: "ru",
    name: "Россия",
    emoji: "🇷🇺",
    prefix: "+7",
    mask: "(***) - *** - ** - **",
  },
  {
    key: "dz",
    name: "Алжир",
    emoji: "🇩🇿",
    prefix: "+213",
    mask: "* ********",
  },
];

export default function App() {
  return (
    <PhoneInput
      masks={MASKS}
      value="+71234567890" // Но можно передать и с пробелами и со скобками и пр.
      onChange={console.log} // Выведется так: +7 (123) 456 - 78 - 9/>
    />
  );
}
