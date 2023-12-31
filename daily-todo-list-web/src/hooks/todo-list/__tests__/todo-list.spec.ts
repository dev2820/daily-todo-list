import { describe, expect, it } from "vitest";
import { useTodoList, type Todo } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useTodoList", () => {
  const items: Todo[] = [
    { id: "0", content: "A", done: false },
    { id: "1", content: "B", done: false },
    { id: "2", content: "C", done: true },
  ];

  it("should return todo list", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));

    expect(todoList.current.todos).toEqual([
      { id: "0", content: "A", done: false },
      { id: "1", content: "B", done: false },
      { id: "2", content: "C", done: true },
    ]);
  });

  it("should have doit method that change todo's state to done", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));
    todoList.current.doit("0");
    todoList.current.doit("2");

    expect(todoList.current.todos[0].done).toBe(true);
    expect(todoList.current.todos[2].done).toBe(true);
  });

  it("should have undo method that change todo's state to undo", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));
    todoList.current.undo("2");

    expect(todoList.current.todos[2].done).toBe(false);
  });

  it("should change content of Todo", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));
    todoList.current.changeContent("1", "D");

    expect(todoList.current.todos[1].content).toBe("D");
  });

  it("should add new Todo", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));
    todoList.current.addTodo();

    expect(todoList.current.todos.length).toBe(4);
  });

  it("should remove Todo", () => {
    const { result: todoList } = renderHook(() => useTodoList("mustdo", items));
    todoList.current.removeTodo("1");

    expect(todoList.current.todos).toEqual([
      { id: "0", content: "A", done: false },
      { id: "2", content: "C", done: true },
    ]);
  });
});
