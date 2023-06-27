import { Todo, isTodoList } from "@/hooks";
import { type Service } from "../types";
import { DAY, type Day } from "@/constants";
import { getStorage } from "@/utils";

const storage = getStorage("local");

const getItem = (key: string): Todo[] => {
  const item = storage.getItem(key);

  return isTodoList(item) ? item : [];
};
const setItem = (key: string, value: Todo[]) => {
  return storage.setItem(key, value);
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
