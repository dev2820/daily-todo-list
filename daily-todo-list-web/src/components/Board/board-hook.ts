import { useState } from "react";
import { uid } from "@/utils/uid";

const MON_KEY = "월";
const TUE_KEY = "화";

export type Todo = {
  id: string;
  content: string;
};
export const useTodoListGroup = () => {
  const todoListTable = new Map<
    string,
    {
      items: Todo[];
      setter: React.Dispatch<React.SetStateAction<Todo[]>>;
    }
  >();

  const [items, setItems] = useState<Todo[]>([
    { id: uid(), content: "A" },
    { id: uid(), content: "B" },
  ]);

  todoListTable.set(MON_KEY, {
    items: items,
    setter: setItems,
  });

  const [items2, setItems2] = useState<Todo[]>([
    { id: uid(), content: "C" },
    { id: uid(), content: "D" },
  ]);

  todoListTable.set(TUE_KEY, {
    items: items2,
    setter: setItems2,
  });

  const removeItem = (targetListId: string, targetItemIndex: number) => {
    todoListTable
      .get(targetListId)
      ?.setter((items: Todo[]) => [
        ...items.slice(0, targetItemIndex),
        ...items.slice(targetItemIndex + 1),
      ]);
  };

  const insertItem = (
    targetListId: string,
    targetItemIndex: number,
    targetItem: Todo
  ) => {
    todoListTable
      .get(targetListId)
      ?.setter((items: Todo[]) => [
        ...items.slice(0, targetItemIndex),
        targetItem,
        ...items.slice(targetItemIndex),
      ]);
  };

  const findItem = (targetListId: string, targetItemIndex: number) => {
    return todoListTable.get(targetListId)?.items[targetItemIndex];
  };

  return {
    todoListTable,
    removeItem,
    insertItem,
    findItem,
    KEYS: [MON_KEY, TUE_KEY],
  };
};
