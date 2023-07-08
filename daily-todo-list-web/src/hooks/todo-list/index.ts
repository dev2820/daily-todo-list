import { type GroupHook, useGroup } from "@/components";
import { uid } from "@/utils";

export type Todo = {
  id: string;
  content: string;
  done: boolean;
};

export interface TodoListHook extends GroupHook<Todo> {
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

export const useTodoList = (
  listName: string,
  initialTodos: Todo[]
): TodoListHook => {
  const todoGroup = useGroup<Todo>(listName, initialTodos);

  const doit = (id: string) => {
    const index = todoGroup.findIndex(id);
    todoGroup.changeItem(index, { done: true });
  };

  const undo = (id: string) => {
    const index = todoGroup.findIndex(id);
    todoGroup.changeItem(index, { done: false });
  };

  const changeContent = (id: string, content: string) => {
    const index = todoGroup.findIndex(id);
    todoGroup.changeItem(index, { content });
  };

  const addTodo = () => {
    const newTodo = { id: uid(), content: "", done: false };
    todoGroup.insertItem(0, newTodo);
  };

  const removeTodo = (id: string) => {
    const index = todoGroup.findIndex(id);
    todoGroup.removeItem(index);
  };

  return {
    todos: todoGroup.items,
    ...todoGroup,
    doit,
    undo,
    changeContent,
    addTodo,
    removeTodo,
  };
};
