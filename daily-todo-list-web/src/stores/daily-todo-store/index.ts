import { Todo } from "@/hooks";

export const dailyTodoStore = () => {
  const mockTodoList: Record<string, Todo[]> = {
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

  const writeMon = (newTodoList: Todo[]) => {
    mockTodoList.mon = newTodoList;

    return true;
  };

  const writeTue = (newTodoList: Todo[]) => {
    mockTodoList.tue = newTodoList;

    return true;
  };

  const writeWed = (newTodoList: Todo[]) => {
    mockTodoList.wed = newTodoList;

    return true;
  };

  const writeThr = (newTodoList: Todo[]) => {
    mockTodoList.thr = newTodoList;

    return true;
  };

  const writeFri = (newTodoList: Todo[]) => {
    mockTodoList.fri = newTodoList;

    return true;
  };

  const writeSat = (newTodoList: Todo[]) => {
    mockTodoList.sat = newTodoList;

    return true;
  };

  const writeSun = (newTodoList: Todo[]) => {
    mockTodoList.sun = newTodoList;

    return true;
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
