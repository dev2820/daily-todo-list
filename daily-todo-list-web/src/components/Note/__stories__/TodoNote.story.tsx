import type { Meta } from "@storybook/react";

import { TodoNote } from "..";
import { useTodoList } from "@/hooks";

const meta = {
  title: "Components/Note/TodoNote",
  component: TodoNote,
} satisfies Meta<typeof TodoNote>;

export default meta;

export const Default = {
  render: () => <Example></Example>,
};

const Example = () => {
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const style = {
    height: "500px",
    width: "300px",
  };

  return (
    <div className="flex">
      <TodoNote style={style} title="월요일" {...todoList}></TodoNote>
    </div>
  );
};
