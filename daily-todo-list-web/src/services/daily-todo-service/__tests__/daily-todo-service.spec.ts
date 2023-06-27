import { beforeEach, describe, expect, it } from "vitest";
import { useDailyTodoService, DAY } from "..";

describe("useDailyTodoService", () => {
  const mockTodoList = {
    [DAY.MON]: [{ id: "0", content: "Todo A in Monday", done: false }],
    [DAY.TUE]: [],
    [DAY.WED]: [],
    [DAY.THR]: [],
    [DAY.FRI]: [{ id: "1", content: "Todo B in Friday", done: false }],
    [DAY.SAT]: [],
    [DAY.SUN]: [],
  };
  beforeEach(() => {
    localStorage.$setup({
      "todo-MON": JSON.stringify([
        { id: "0", content: "Todo A in Monday", done: false },
      ]),
      "todo-TUE": JSON.stringify([]),
      "todo-WED": JSON.stringify([]),
      "todo-THR": JSON.stringify([]),
      "todo-FRI": JSON.stringify([
        { id: "1", content: "Todo B in Friday", done: false },
      ]),
      "todo-SAT": JSON.stringify([]),
      "todo-SUN": JSON.stringify([]),
    });
  });
  it("should read all todo list", () => {
    const service = useDailyTodoService();
    expect(service.readAll()).toEqual(mockTodoList);
  });

  it("should read one todo list", () => {
    const service = useDailyTodoService();
    expect(service.read(DAY.MON)).toEqual(mockTodoList[DAY.MON]);
  });

  it("should write one day todo list", () => {
    const service = useDailyTodoService();
    service.write(DAY.MON, [
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);

    expect(service.read(DAY.MON)).toEqual([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);
  });

  it("should write todo list each day of week", () => {
    const service = useDailyTodoService();
    service.write(DAY.MON, [
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);

    expect(service.read(DAY.MON)).toEqual([
      { id: "0", content: "Updated Todo A in Monday", done: false },
      { id: "2", content: "New Todo B in Monday", done: true },
    ]);
  });
});
