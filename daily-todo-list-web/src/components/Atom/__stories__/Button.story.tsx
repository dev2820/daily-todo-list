import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";

const meta = {
  title: "Components/Atoms/Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  render: () => <Button>Click me!</Button>,
};
