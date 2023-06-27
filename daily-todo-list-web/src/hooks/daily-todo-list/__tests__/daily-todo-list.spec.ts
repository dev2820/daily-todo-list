import { describe, expect, it } from "vitest";
import { useDailyTodoList } from "..";
import { renderHook } from "@testing-library/react-hooks";

describe("useDailyTodoList", () => {
  const monTodoListInit = [{ id: "0", content: "Todo Mon", done: false }];
  const tueTodoListInit = [{ id: "0", content: "Todo Tue", done: false }];
  const wedTodoListInit = [{ id: "0", content: "Todo Wed", done: false }];
  const thrTodoListInit = [{ id: "0", content: "Todo Thr", done: false }];
  const friTodoListInit = [{ id: "0", content: "Todo Fri", done: false }];
  const satTodoListInit = [{ id: "0", content: "Todo Sat", done: false }];
  const sunTodoListInit = [{ id: "0", content: "Todo Sun", done: false }];
  const items = [
    monTodoListInit,
    tueTodoListInit,
    wedTodoListInit,
    thrTodoListInit,
    friTodoListInit,
    satTodoListInit,
    sunTodoListInit,
  ];

  it("should init from list", () => {
    const { result: dailyTodoList } = renderHook(() => useDailyTodoList(items));

    expect(dailyTodoList.current.mon.todos).toEqual(monTodoListInit);
    expect(dailyTodoList.current.tue.todos).toEqual(tueTodoListInit);
    expect(dailyTodoList.current.wed.todos).toEqual(wedTodoListInit);
    expect(dailyTodoList.current.thr.todos).toEqual(thrTodoListInit);
    expect(dailyTodoList.current.fri.todos).toEqual(friTodoListInit);
    expect(dailyTodoList.current.sat.todos).toEqual(satTodoListInit);
    expect(dailyTodoList.current.sun.todos).toEqual(sunTodoListInit);
  });
});
