import { useSortableList, type SortableListHook } from "@/hooks/sortable-list";
import { uid } from "@/utils";

export type Todo = {
  id: string;
  content: string;
  done: boolean;
};

export interface TodoListHook extends Pick<SortableListHook, "sort"> {
  todos: Todo[];
  doit: (id: string) => void;
  undo: (id: string) => void;
  removeTodo: (id: string) => void;
  addTodo: () => void;
  changeContent: (id: string, content: string) => void;
}

export const isTodo = (maybeTodo: any): maybeTodo is Todo => {
  if (typeof maybeTodo !== "object") return false;
  if (maybeTodo === null) return false;
  if (typeof maybeTodo.id !== "string") return false;
  if (typeof maybeTodo.content !== "string") return false;
  if (typeof maybeTodo.done !== "boolean") return false;

  return true;
};

export const isTodoList = (maybeTodoList: unknown): maybeTodoList is Todo[] => {
  if (!Array.isArray(maybeTodoList)) return false;
  return maybeTodoList.every((todo) => isTodo(todo));
};

export const useTodoList = (initialTodos: Todo[]): TodoListHook => {
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
      newTodos[targetIndex] = { ...newTodos[targetIndex], done: true };

      return newTodos;
    });
  };
  const undo = (id: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const targetIndex = newTodos.findIndex((todo) => todo.id === id);
      if (targetIndex < 0) return newTodos;
      newTodos[targetIndex] = { ...newTodos[targetIndex], done: false };

      return newTodos;
    });
  };

  const changeContent = (id: string, content: string) => {
    setTodos((todos: Todo[]) => {
      const newTodos = [...todos];
      const targetIndex = newTodos.findIndex((todo) => todo.id === id);
      if (targetIndex < 0) return newTodos;
      newTodos[targetIndex] = { ...newTodos[targetIndex], content };

      return newTodos;
    });
  };

  const addTodo = () => {
    setTodos((todos: Todo[]) => {
      const newTodo = { id: uid(), content: "", done: false };
      return [...todos, newTodo];
    });
  };

  const removeTodo = (id: string) => {
    setTodos((todos: Todo[]) => {
      return todos.filter((todo) => todo.id !== id);
    });
  };

  return {
    todos,
    sort,
    doit,
    undo,
    changeContent,
    addTodo,
    removeTodo,
  };
};
