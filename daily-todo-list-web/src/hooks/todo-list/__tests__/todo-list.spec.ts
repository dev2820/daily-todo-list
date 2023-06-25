import { describe, expect, it } from "vitest";
import { useTodoList, type Todo } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useTodoList", () => {
  const items: Todo[] = [
    { content: "A", done: false },
    { content: "B", done: false },
    { content: "C", done: true },
  ];

  it("should return todo list", () => {
    const { result: todoList } = renderHook(() => useTodoList(items));
    expect(todoList.current.todos).toEqual([
      { content: "A", done: false },
      { content: "B", done: false },
      { content: "C", done: true },
    ]);
  });

  it("should sortable", () => {
    const { result: todoList } = renderHook(() => useTodoList(items));
    todoList.current.sort({ oldIndex: 1, newIndex: 2 });

    expect(todoList.current.todos).toEqual([
      { content: "A", done: false },
      { content: "C", done: true },
      { content: "B", done: false },
    ]);
  });

  it("should have doit method that change todo's state to done", () => {
    const { result: todoList } = renderHook(() => useTodoList(items));
    todoList.current.doit(0);
    todoList.current.doit(2);

    expect(todoList.current.todos[0].done).toBe(true);
    expect(todoList.current.todos[2].done).toBe(true);
  });

  it("should have undo method that change todo's state to undo", () => {
    const { result: todoList } = renderHook(() => useTodoList(items));
    todoList.current.undo(2);

    expect(todoList.current.todos[2].done).toBe(false);
  });
});
