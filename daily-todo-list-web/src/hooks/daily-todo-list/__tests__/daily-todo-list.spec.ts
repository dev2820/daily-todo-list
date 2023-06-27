import { describe, expect, it } from "vitest";
import { useDailyTodoList } from "..";
import { renderHook } from "@testing-library/react-hooks";
import { DAY } from "@/services";

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
    const {
      result: { current: dailyTodoList },
    } = renderHook(() => useDailyTodoList(items));

    expect(dailyTodoList[DAY.MON].todos).toEqual(monTodoListInit);
    expect(dailyTodoList[DAY.TUE].todos).toEqual(tueTodoListInit);
    expect(dailyTodoList[DAY.WED].todos).toEqual(wedTodoListInit);
    expect(dailyTodoList[DAY.THR].todos).toEqual(thrTodoListInit);
    expect(dailyTodoList[DAY.FRI].todos).toEqual(friTodoListInit);
    expect(dailyTodoList[DAY.SAT].todos).toEqual(satTodoListInit);
    expect(dailyTodoList[DAY.SUN].todos).toEqual(sunTodoListInit);
  });
});
