import { useTodoList, type Todo, type TodoListHook } from "@/hooks";
import { DAY, type Day } from "@/services";

const DAY_OF_WEEK = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THR: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
} as const;

export type DailyTodoList = Record<Day, TodoListHook>;

export const useDailyTodoList = (
  initialTodos: Todo[][] = [[], [], [], [], [], [], []]
): DailyTodoList => {
  const monTodoList = useTodoList(initialTodos[DAY_OF_WEEK.MON]);
  const tueTodoList = useTodoList(initialTodos[DAY_OF_WEEK.TUE]);
  const wedTodoList = useTodoList(initialTodos[DAY_OF_WEEK.WED]);
  const thrTodoList = useTodoList(initialTodos[DAY_OF_WEEK.THR]);
  const friTodoList = useTodoList(initialTodos[DAY_OF_WEEK.FRI]);
  const satTodoList = useTodoList(initialTodos[DAY_OF_WEEK.SAT]);
  const sunTodoList = useTodoList(initialTodos[DAY_OF_WEEK.SUN]);

  return {
    [DAY.MON]: monTodoList,
    [DAY.TUE]: tueTodoList,
    [DAY.WED]: wedTodoList,
    [DAY.THR]: thrTodoList,
    [DAY.FRI]: friTodoList,
    [DAY.SAT]: satTodoList,
    [DAY.SUN]: sunTodoList,
  };
};
