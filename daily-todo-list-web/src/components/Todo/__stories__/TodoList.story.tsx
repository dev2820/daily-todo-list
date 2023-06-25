import type { Meta } from "@storybook/react";

import { useTodoList, type Todo } from "@/hooks";
import { TodoList, TodoItem } from "..";

const meta = {
  title: "Components/Todo/TodoList",
  component: TodoList,
} satisfies Meta<typeof TodoList>;

export default meta;

export const Default = {
  render: () => <TodoListExample></TodoListExample>,
};

const TodoListExample = () => {
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const renderTodo = (todo: Todo, index: number) => {
    return (
      <TodoItem
        todo={todo}
        onDo={() => todoList.doit(index)}
        onUndo={() => todoList.undo(index)}
        onChangeContent={(content: string) =>
          todoList.changeContent(index, content)
        }
      ></TodoItem>
    );
  };

  return (
    <TodoList
      todos={todoList.todos}
      renderTodo={renderTodo}
      onSortEnd={todoList.sort}
    ></TodoList>
  );
};
