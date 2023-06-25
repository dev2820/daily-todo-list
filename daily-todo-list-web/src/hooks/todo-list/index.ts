import { useSortableList } from "@/hooks/sortable-list";

export type Todo = {
  content: string;
  done: boolean;
};

export const useTodoList = (initialTodos: Todo[]) => {
  const {
    list: todos,
    sort,
    setList: setTodos,
  } = useSortableList<Todo>(initialTodos);

  const doit = (index: number) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      newTodos[index].done = true;

      return newTodos;
    });
  };
  const undo = (index: number) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      newTodos[index].done = false;

      return newTodos;
    });
  };

  const changeContent = (index: number, content: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      newTodos[index].content = content;

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
