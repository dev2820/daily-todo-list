import type { Meta, StoryObj } from "@storybook/react";

import { AutoHeightTextarea } from "..";
import { useState, ChangeEvent } from "react";

const meta = {
  title: "Components/Atoms/AutoHeightTextarea",
  component: AutoHeightTextarea,
} satisfies Meta<typeof AutoHeightTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  render: () => <Example></Example>,
};

const Example = () => {
  const [text, setText] = useState("Hello World");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <AutoHeightTextarea
      value={text}
      onChange={onChange}
      placeholder="Write Something..."
    ></AutoHeightTextarea>
  );
};
export const Placeholder: Story = {
  render: () => (
    <AutoHeightTextarea
      value=""
      placeholder="Write Something..."
    ></AutoHeightTextarea>
  ),
};

export const ShortText: Story = {
  args: {
    value: "short text",
  },
  render: (args) => (
    <AutoHeightTextarea value={args.value}></AutoHeightTextarea>
  ),
};

export const MultiRows: Story = {
  args: {
    value: `LINE 1
LINE 2
LINE 3
`,
  },
  render: (args) => (
    <AutoHeightTextarea value={args.value}></AutoHeightTextarea>
  ),
};
