import { beforeEach, describe, expect, it } from "vitest";
import { dailyTodoService } from "..";

describe("dailyTodoService", () => {
  const mockTodoList = {
    mon: [{ id: "0", content: "Todo A in Monday", done: false }],
    tue: [],
    wed: [],
    thr: [],
    fri: [{ id: "1", content: "Todo B in Friday", done: false }],
    sat: [],
    sun: [],
  };
  beforeEach(() => {
    localStorage.$setup({
      "todo-mon": JSON.stringify([
        { id: "0", content: "Todo A in Monday", done: false },
      ]),
      "todo-tue": JSON.stringify([]),
      "todo-wed": JSON.stringify([]),
      "todo-thr": JSON.stringify([]),
      "todo-fri": JSON.stringify([
        { id: "1", content: "Todo B in Friday", done: false },
      ]),
      "todo-sat": JSON.stringify([]),
      "todo-sun": JSON.stringify([]),
    });
  });
  it("should read all todo list", () => {
    const service = dailyTodoService();
    expect(service.readAll()).toEqual(mockTodoList);
  });

  it("should read one todo list", () => {
    const service = dailyTodoService();
    expect(service.read("mon")).toEqual(mockTodoList.mon);
  });

  it("should read todo list each day of week", () => {
    const service = dailyTodoService();

    expect(service.readMon()).toEqual(mockTodoList.mon);
    expect(service.readTue()).toEqual(mockTodoList.tue);
    expect(service.readWed()).toEqual(mockTodoList.wed);
    expect(service.readThr()).toEqual(mockTodoList.thr);
    expect(service.readFri()).toEqual(mockTodoList.fri);
    expect(service.readSat()).toEqual(mockTodoList.sat);
    expect(service.readSun()).toEqual(mockTodoList.sun);
  });
  it("should write one day todo list", () => {
    const service = dailyTodoService();
    service.write("mon", [
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);

    expect(service.readMon()).toEqual([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);
  });

  it("should write todo list each day of week", () => {
    const service = dailyTodoService();
    service.writeMon([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);

    expect(service.readMon()).toEqual([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);
  });
});
