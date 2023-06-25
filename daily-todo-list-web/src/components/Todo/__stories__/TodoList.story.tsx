import type { Meta, StoryObj } from "@storybook/react";

import { TodoList } from "..";

const meta = {
  title: "Components/Todo/TodoList",
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    todos: [
      { content: "Todo A", done: false },
      { content: "Todo B", done: true },
      { content: "Todo C", done: false },
    ],
  },
  render: (args) => <TodoList todos={args.todos}></TodoList>,
};
