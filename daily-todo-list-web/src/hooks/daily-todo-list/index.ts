import { useTodoList, type Todo, type TodoListHook } from "@/hooks";
import { DAY, type Day } from "@/constants";

export type OnMove = (result: {
  fromGroupId: string;
  fromIndex: number;
  toGroupId: string;
  toIndex: number;
}) => void;

const DAY_OF_WEEK = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THR: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6,
} as const;

export type DailyTodoList = Record<Day, TodoListHook> & {
  all: TodoListHook[];
  move: OnMove;
};

export const useDailyTodoList = (
  initialTodos: Todo[][] = [[], [], [], [], [], [], []]
): DailyTodoList => {
  const monTodoList = useTodoList("월요일", initialTodos[DAY_OF_WEEK.MON]);
  const tueTodoList = useTodoList("화요일", initialTodos[DAY_OF_WEEK.TUE]);
  const wedTodoList = useTodoList("수요일", initialTodos[DAY_OF_WEEK.WED]);
  const thrTodoList = useTodoList("목요일", initialTodos[DAY_OF_WEEK.THR]);
  const friTodoList = useTodoList("금요일", initialTodos[DAY_OF_WEEK.FRI]);
  const satTodoList = useTodoList("토요일", initialTodos[DAY_OF_WEEK.SAT]);
  const sunTodoList = useTodoList("일요일", initialTodos[DAY_OF_WEEK.SUN]);
  const all = [
    monTodoList,
    tueTodoList,
    wedTodoList,
    thrTodoList,
    friTodoList,
    satTodoList,
    sunTodoList,
  ];
  const move: OnMove = ({ fromGroupId, fromIndex, toGroupId, toIndex }) => {
    const fromGroup = all.find((group) => group.id === fromGroupId);
    const toGroup = all.find((group) => group.id === toGroupId);
    if (fromGroup === undefined || toGroup === undefined) return;

    const targetItem = fromGroup.findByIndex(fromIndex);
    if (!targetItem) return;

    fromGroup.removeItem(fromIndex);
    toGroup.insertItem(toIndex, targetItem);
  };

  return {
    [DAY.MON]: monTodoList,
    [DAY.TUE]: tueTodoList,
    [DAY.WED]: wedTodoList,
    [DAY.THR]: thrTodoList,
    [DAY.FRI]: friTodoList,
    [DAY.SAT]: satTodoList,
    [DAY.SUN]: sunTodoList,
    move,
    all,
  };
};
