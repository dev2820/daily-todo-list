import { describe, expect, it } from "vitest";
import { useTodoList, type Todo } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useTodoList", () => {
  it("should increase value", () => {
    const todos: Todo[] = [
      { content: "todo A", done: false },
      { content: "todo B", done: false },
      { content: "todo C", done: true },
    ];
    const { result: todoList } = renderHook(() => useTodoList(todos));

    expect(todoList.current.todoList.length).toBe(3);
  });
});
