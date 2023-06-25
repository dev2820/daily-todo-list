import type { Meta, StoryObj } from "@storybook/react";

import { DragHandle } from "..";

const meta = {
  title: "Components/Atoms/DragHandle",
  component: DragHandle,
} satisfies Meta<typeof DragHandle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotDone: Story = {
  render: () => <DragHandle></DragHandle>,
};
