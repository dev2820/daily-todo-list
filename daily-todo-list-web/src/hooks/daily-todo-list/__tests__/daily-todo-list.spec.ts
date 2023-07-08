import { describe, expect, it } from "vitest";
import { useDailyTodoList } from "..";
import { act, renderHook } from "@testing-library/react-hooks";
import { DAY } from "@/constants";

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

  it("should return all groups", () => {
    const dailyTodos = renderHook(() =>
      useDailyTodoList([
        [
          { id: "1", content: "A", done: false },
          { id: "2", content: "B", done: false },
        ],
        [
          { id: "3", content: "C", done: false },
          { id: "4", content: "D", done: false },
        ],
        [],
        [],
        [],
        [],
        [],
      ])
    );

    expect(
      dailyTodos.result.current.all.map((group) => group.items)
    ).toStrictEqual([
      [
        { id: "1", content: "A", done: false },
        { id: "2", content: "B", done: false },
      ],
      [
        { id: "3", content: "C", done: false },
        { id: "4", content: "D", done: false },
      ],
      [],
      [],
      [],
      [],
      [],
    ]);
  });

  it("should move each groups", () => {
    const dailyTodos = renderHook(() =>
      useDailyTodoList([
        [
          { id: "1", content: "A", done: false },
          { id: "2", content: "B", done: false },
        ],
        [
          { id: "3", content: "C", done: false },
          { id: "4", content: "D", done: false },
        ],
        [],
        [],
        [],
        [],
        [],
      ])
    );

    act(() =>
      dailyTodos.result.current.move({
        fromGroupId: "월요일",
        fromIndex: 0,
        toGroupId: "화요일",
        toIndex: 0,
      })
    );
    console.log(dailyTodos.result.current.all[0]);
    expect(
      dailyTodos.result.current.all.map((group) => group.items)
    ).toStrictEqual([
      [{ id: "2", content: "B", done: false }],
      [
        { id: "1", content: "A", done: false },
        { id: "3", content: "C", done: false },
        { id: "4", content: "D", done: false },
      ],
      [],
      [],
      [],
      [],
      [],
    ]);
  });
});
