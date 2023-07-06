import { type Identifiable, type Id } from "@/components/types";
import { type GroupHook } from "./group-hook";

export type OnMove = (result: {
  fromGroupId: Id;
  fromIndex: number;
  toGroupId: Id;
  toIndex: number;
}) => void;

export const useGroupBoard = <T extends Identifiable>(
  groups: GroupHook<T>[] = []
) => {
  const move: OnMove = ({ fromGroupId, fromIndex, toGroupId, toIndex }) => {
    const fromGroup = groups.find((group) => group.id === fromGroupId);
    const toGroup = groups.find((group) => group.id === toGroupId);

    if (fromGroup === undefined || toGroup === undefined) return;

    const targetItem = fromGroup.findByIndex(fromIndex);
    if (!targetItem) return;

    fromGroup.removeItem(fromIndex);
    toGroup.insertItem(toIndex, targetItem);
  };

  return {
    move,
  };
};

export type GroupBoardHook<T extends Identifiable> = ReturnType<
  typeof useGroupBoard<T>
>;
