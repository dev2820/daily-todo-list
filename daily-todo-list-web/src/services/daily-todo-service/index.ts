import { Todo } from "@/hooks";

export const DAY = {
  MON: "MON",
  TUE: "TUE",
  WED: "WED",
  THR: "THR",
  FRI: "FRI",
  SAT: "SAT",
  SUN: "SUN",
} as const;

export type Day = keyof typeof DAY;

const getItem = (key: string) => {
  const item = localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

const setItem = (key: string, data: Todo[]) => {
  localStorage.setItem(key, JSON.stringify(data));

  return true;
};

const read = (day: Day) => getItem(`todo-${day}`) ?? [];

const readAll = () => ({
  mon: readMon(),
  tue: readTue(),
  wed: readWed(),
  thr: readThr(),
  fri: readFri(),
  sat: readSat(),
  sun: readSun(),
});

const readMon = () => read(DAY.MON);
const readTue = () => read(DAY.TUE);
const readWed = () => read(DAY.WED);
const readThr = () => read(DAY.THR);
const readFri = () => read(DAY.FRI);
const readSat = () => read(DAY.SAT);
const readSun = () => read(DAY.SUN);

const write = (day: Day, newTodoList: Todo[]) =>
  setItem(`todo-${day}`, newTodoList);

const writeMon = (newTodoList: Todo[]) => write(DAY.MON, newTodoList);
const writeTue = (newTodoList: Todo[]) => write(DAY.TUE, newTodoList);
const writeWed = (newTodoList: Todo[]) => write(DAY.WED, newTodoList);
const writeThr = (newTodoList: Todo[]) => write(DAY.THR, newTodoList);
const writeFri = (newTodoList: Todo[]) => write(DAY.FRI, newTodoList);
const writeSat = (newTodoList: Todo[]) => write(DAY.SAT, newTodoList);
const writeSun = (newTodoList: Todo[]) => write(DAY.SUN, newTodoList);

export const useDailyTodoService = () => {
  return {
    read,
    readAll,
    readMon,
    readTue,
    readWed,
    readThr,
    readFri,
    readSat,
    readSun,
    write,
    writeMon,
    writeTue,
    writeWed,
    writeThr,
    writeFri,
    writeSat,
    writeSun,
  };
};
