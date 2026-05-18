// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { Meta, StoryObj } from "@storybook/react-webpack5";

import PhoneInput from "./../components/PhoneInput";

//👇 This default export determines where your story goes in the story list
const meta = {
  component: PhoneInput,

  args: {
    masks: [
      {
        key: "ru",
        name: "Россия",
        emoji: "🇷🇺",
        prefix: "+7",
        mask: "(***) - *** - ** - **",
      },
    ],
    value: "7999 999 99 99",
    onChange: () => {},
  },
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    masks: [
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
    ],
    value: "71231231",
    onChange: console.log,
    disabled: false,
    //👇 The args you need here will depend on your component
  },
};
