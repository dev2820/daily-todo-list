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
    initialTodos: [
      { id: "0", content: "Todo A", done: false },
      { id: "1", content: "Todo B", done: true },
      { id: "2", content: "Todo C", done: false },
    ],
  },
  render: (args) => <TodoList initialTodos={args.initialTodos}></TodoList>,
};
