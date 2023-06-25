import { useSortableList } from "@/hooks/sortable-list";
import { uid } from "@/utils";

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
      const targetIndex = newTodos.findIndex((todo) => todo.id === id);
      if (targetIndex < 0) return newTodos;
      newTodos[targetIndex].done = true;

      return newTodos;
    });
  };
  const undo = (id: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const targetIndex = newTodos.findIndex((todo) => todo.id === id);
      if (targetIndex < 0) return newTodos;
      newTodos[targetIndex].done = false;

      return newTodos;
    });
  };

  const changeContent = (id: string, content: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const targetIndex = newTodos.findIndex((todo) => todo.id === id);
      if (targetIndex < 0) return newTodos;
      newTodos[targetIndex].content = content;

      return newTodos;
    });
  };

  const addTodo = () => {
    setTodos((todos: Todo[]) => {
      const newTodo = { id: uid(), content: "", done: false };
      return [...todos, newTodo];
    });
  };

  return {
    todos,
    sort,
    doit,
    undo,
    changeContent,
    addTodo,
  };
};
