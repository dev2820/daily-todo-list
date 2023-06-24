import type { Meta, StoryObj } from "@storybook/react";

import { TodoList } from "..";

const meta = {
  title: "Components/TodoList",
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { content: "Todo A", done: false },
      { content: "Todo B", done: true },
    ],
  },
  render: (args) => <TodoList items={args.items}></TodoList>,
};
