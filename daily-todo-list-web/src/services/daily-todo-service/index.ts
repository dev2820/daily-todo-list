import { Todo } from "@/hooks";
import { type Service } from "../types";
import { DAY } from "@/constants";

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
  [DAY.MON]: read(DAY.MON),
  [DAY.TUE]: read(DAY.TUE),
  [DAY.WED]: read(DAY.WED),
  [DAY.THR]: read(DAY.THR),
  [DAY.FRI]: read(DAY.FRI),
  [DAY.SAT]: read(DAY.SAT),
  [DAY.SUN]: read(DAY.SUN),
});

const write = (day: Day, newTodoList: Todo[]) =>
  setItem(`todo-${day}`, newTodoList);

export interface DailyTodoService extends Service<Day, Todo[]> {
  readAll: () => Record<Day, Todo[]>;
}
export const useDailyTodoService = (): DailyTodoService => {
  return {
    read,
    readAll,
    write,
  };
};
