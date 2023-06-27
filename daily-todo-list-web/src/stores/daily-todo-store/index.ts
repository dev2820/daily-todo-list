import { Todo } from "@/hooks";

type Day = "mon" | "tue" | "wed" | "thr" | "fri" | "sat" | "sun";

export const dailyTodoStore = () => {
  const mockTodoList: Record<Day, Todo[]> = {
    mon: [{ id: "0", content: "Todo A in Monday", done: false }],
    tue: [],
    wed: [],
    thr: [],
    fri: [{ id: "1", content: "Todo B in Friday", done: false }],
    sat: [],
    sun: [],
  };

  const readAll = () => {
    return mockTodoList;
  };

  const readMon = () => {
    return mockTodoList.mon;
  };

  const readTue = () => {
    return mockTodoList.tue;
  };

  const readWed = () => {
    return mockTodoList.wed;
  };

  const readThr = () => {
    return mockTodoList.thr;
  };

  const readFri = () => {
    return mockTodoList.fri;
  };

  const readSat = () => {
    return mockTodoList.sat;
  };

  const readSun = () => {
    return mockTodoList.sun;
  };

  const _write = (day: Day, newTodoList: Todo[]) => {
    mockTodoList[day] = newTodoList;

    return true;
  };

  const writeMon = (newTodoList: Todo[]) => {
    return _write("mon", newTodoList);
  };

  const writeTue = (newTodoList: Todo[]) => {
    return _write("tue", newTodoList);
  };

  const writeWed = (newTodoList: Todo[]) => {
    return _write("wed", newTodoList);
  };

  const writeThr = (newTodoList: Todo[]) => {
    return _write("thr", newTodoList);
  };

  const writeFri = (newTodoList: Todo[]) => {
    return _write("fri", newTodoList);
  };

  const writeSat = (newTodoList: Todo[]) => {
    return _write("sat", newTodoList);
  };

  const writeSun = (newTodoList: Todo[]) => {
    return _write("sun", newTodoList);
  };

  return {
    readAll,
    readMon,
    readTue,
    readWed,
    readThr,
    readFri,
    readSat,
    readSun,
    writeMon,
    writeTue,
    writeWed,
    writeThr,
    writeFri,
    writeSat,
    writeSun,
  };
};
