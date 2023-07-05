import { uid } from "@/utils/uid";
import { useGroup, type GroupHook } from "./group-hook";

const MON_KEY = "월";
const TUE_KEY = "화";
const WED_KEY = "수";

export type Todo = {
  id: string;
  content: string;
};

export const useTodoListGroup = () => {
  const todoListTable = new Map<string, GroupHook<Todo>>();

  const group1 = useGroup<Todo>([
    { id: uid(), content: "A" },
    { id: uid(), content: "B" },
  ]);
  todoListTable.set(MON_KEY, group1);

  const group2 = useGroup<Todo>([
    { id: uid(), content: "C" },
    { id: uid(), content: "D" },
  ]);

  todoListTable.set(TUE_KEY, group2);

  const group3 = useGroup<Todo>([
    { id: uid(), content: "E" },
    { id: uid(), content: "F" },
  ]);

  todoListTable.set(WED_KEY, group3);

  const removeItem = (targetListId: string, targetItemIndex: number) => {
    todoListTable.get(targetListId)?.removeItem(targetItemIndex);
  };

  const insertItem = (
    targetListId: string,
    targetItemIndex: number,
    targetItem: Todo
  ) => {
    todoListTable.get(targetListId)?.insertItem(targetItemIndex, targetItem);
  };

  const findItem = (targetListId: string, targetItemIndex: number) => {
    const item = todoListTable.get(targetListId)?.findByIndex(targetItemIndex);
    if (item) return item as Todo;
    return undefined;
  };

  return {
    todoListTable,
    removeItem,
    insertItem,
    findItem,
    KEYS: [MON_KEY, TUE_KEY, WED_KEY],
  };
};
