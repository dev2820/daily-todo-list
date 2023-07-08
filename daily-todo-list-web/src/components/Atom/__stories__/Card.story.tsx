import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "../Card";

const meta = {
  title: "Components/Atoms/Card",
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  render: () => <Card>I'm a Card</Card>,
};
