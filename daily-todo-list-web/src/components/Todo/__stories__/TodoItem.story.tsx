import type { Meta, StoryObj } from "@storybook/react";

import { TodoItem } from "..";

const meta = {
  title: "Components/Todo/TodoItem",
  component: TodoItem,
} satisfies Meta<typeof TodoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NotDone: Story = {
  args: {
    todo: { id: "0", content: "Todo Not Done", done: false },
  },
  render: (args) => <TodoItem todo={args.todo}></TodoItem>,
};

export const Done: Story = {
  args: {
    todo: { id: "0", content: "Todo Done", done: true },
  },
  render: (args) => <TodoItem todo={args.todo}></TodoItem>,
};
