import type { Meta, StoryObj } from "@storybook/react";

import { DoneButton } from "..";

const meta = {
  title: "Components/Atoms/DoneButton",
  component: DoneButton,
} satisfies Meta<typeof DoneButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DoneButton></DoneButton>,
};
