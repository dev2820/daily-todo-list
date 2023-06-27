import { describe, expect, it, vi } from "vitest";
import { dailyTodoStore } from "..";

describe("dailyTodoStore", () => {
  const mockTodoList = {
    mon: [{ id: "0", content: "Todo A in Monday", done: false }],
    tue: [],
    wed: [],
    thr: [],
    fri: [{ id: "1", content: "Todo B in Friday", done: false }],
    sat: [],
    sun: [],
  };
  it("should write all todo list", () => {
    const store = dailyTodoStore();
    expect(store.readAll()).toEqual(mockTodoList);
  });
  it("should read todo list each day of week", () => {
    const store = dailyTodoStore();

    expect(store.readMon()).toEqual(mockTodoList.mon);
    expect(store.readTue()).toEqual(mockTodoList.tue);
    expect(store.readWed()).toEqual(mockTodoList.wed);
    expect(store.readThr()).toEqual(mockTodoList.thr);
    expect(store.readFri()).toEqual(mockTodoList.fri);
    expect(store.readSat()).toEqual(mockTodoList.sat);
    expect(store.readSun()).toEqual(mockTodoList.sun);
  });
  it("should write todo list each day of week", () => {
    const store = dailyTodoStore();
    store.writeMon([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);

    expect(store.readMon()).toEqual([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);
  });
});
