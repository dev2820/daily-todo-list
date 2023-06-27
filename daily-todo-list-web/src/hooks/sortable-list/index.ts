import { useState } from "react";
import { arrayMoveImmutable } from "array-move";

export const useSortableList = <T>(items?: T[]) => {
  const [list, setList] = useState(items ?? []);
  const sort = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setList((items) => {
      return arrayMoveImmutable(items, oldIndex, newIndex);
    });

    return;
  };
  return {
    sort,
    list,
    setList,
  };
};

export type SortableListHook = ReturnType<typeof useSortableList>;
