import { DropResult } from "react-beautiful-dnd";
import {
  Draggable,
  Droppable,
  DragDropContext,
  BoardLayout,
} from "@/components";
import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";
import { type GroupHook } from "./group-hook";
import { type Id, type Identifiable } from "@/components/types";

export type OnDragEnd = (result: DropResult) => void;
export type OnMove = (
  fromId: Id,
  fromIndex: number,
  toId: Id,
  toIndex: number
) => void;

export const GroupBoard = <T extends Identifiable>({
  groups,
  renderItem,
}: {
  groups: GroupHook<T>[];
  renderItem: (item: T) => JSX.Element;
}) => {
  const onDragEnd: OnDragEnd = (dropResult) => {
    const { destination, source } = dropResult;
    if (!destination || !source) return;
    const sourceGrouId = source.droppableId;
    const destGroupId = destination.droppableId;

    const sourceGroup = groups.find((group) => group.id === sourceGrouId);
    const destinationGroup = groups.find((group) => group.id === destGroupId);

    if (sourceGroup === undefined || destinationGroup === undefined) return;

    const targetItem = sourceGroup.findByIndex(source.index);
    if (!targetItem) return;

    sourceGroup.removeItem(source.index);
    destinationGroup.insertItem(destination.index, targetItem);
  };

  return (
    <GroupContext onDragEnd={onDragEnd}>
      <BoardLayout>
        {groups.map((group) => (
          <Group groupId={group.id} key={group.id} className={GroupStyle()}>
            {group.items.map((item, index) => (
              <GroupItem itemId={item.id} index={index} key={item.id}>
                {renderItem(item)}
              </GroupItem>
            ))}
          </Group>
        ))}
      </BoardLayout>
    </GroupContext>
  );
};

const GroupContext = ({
  children,
  onDragEnd,
}: PropsWithChildren<{ onDragEnd: OnDragEnd }>) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

const Group = ({
  children,
  groupId,
  className,
}: PropsWithChildren<{ className?: string; groupId: string }>) => {
  return (
    <Droppable droppableId={groupId} key={groupId} className={className}>
      {children}
    </Droppable>
  );
};

const GroupItem = ({
  itemId,
  children,
  index,
}: PropsWithChildren<{
  itemId: string;
  index: number;
}>) => {
  return (
    <Draggable draggableId={itemId} index={index} key={itemId}>
      {children}
    </Draggable>
  );
};

const GroupStyle = cva("h-40");
