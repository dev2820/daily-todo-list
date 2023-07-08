import { PropsWithChildren } from "react";
import { type OnMove } from "@/hooks";
import { DropResult } from "react-beautiful-dnd";
import { DragDropContext } from "@/components";

export type OnDragEnd = (result: DropResult) => void;

export const GroupContext = ({
  children,
  onMove,
}: PropsWithChildren<{ onMove: OnMove }>) => {
  const onDragEnd: OnDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination || !source) return;
    const fromGroupId = source.droppableId;
    const toGroupId = destination.droppableId;
    const fromIndex = source.index;
    const toIndex = destination.index;

    if (!fromGroupId || !toGroupId) return;

    onMove({ fromGroupId, fromIndex, toGroupId, toIndex });
  };

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
