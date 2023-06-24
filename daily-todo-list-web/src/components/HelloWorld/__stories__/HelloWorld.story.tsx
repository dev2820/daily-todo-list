import type { Meta, StoryObj } from "@storybook/react";

import { HelloWorld } from "..";

const meta = {
  title: "Example/HelloWorld",
  component: HelloWorld,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <HelloWorld></HelloWorld>,
};
