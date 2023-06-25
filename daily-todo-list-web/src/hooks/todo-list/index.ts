import { useSortableList } from "@/hooks/sortable-list";

export type Todo = {
  id: string;
  content: string;
  done: boolean;
};

export const useTodoList = (initialTodos: Todo[]) => {
  const {
    list: todos,
    sort,
    setList: setTodos,
  } = useSortableList<Todo>(initialTodos);

  const doit = (id: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const target = newTodos.find((todo) => todo.id === id);
      if (!target) return todos;
      target.done = true;

      return newTodos;
    });
  };
  const undo = (id: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const target = newTodos.find((todo) => todo.id === id);
      if (!target) return todos;
      target.done = false;

      return newTodos;
    });
  };

  const changeContent = (id: string, content: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const target = newTodos.find((todo) => todo.id === id);
      if (!target) return todos;
      target.content = content;

      return newTodos;
    });
  };
  return {
    todos,
    sort,
    doit,
    undo,
    changeContent,
  };
};
