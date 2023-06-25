import type { Meta, StoryObj } from "@storybook/react";

import { TodoList } from "..";

const meta = {
  title: "Components/TodoList",
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TodoList></TodoList>,
};
