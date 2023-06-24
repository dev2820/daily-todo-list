import { useState } from "react";

export type Todo = {
  content: string;
  done: boolean;
};

export const useTodoList = (todos: Todo[]) => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);

  return {
    todoList,
  };
};
