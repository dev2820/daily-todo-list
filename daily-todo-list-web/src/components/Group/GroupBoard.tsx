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
export type OnMove = (result: {
  fromGroupId: Id;
  fromIndex: number;
  toGroupId: Id;
  toIndex: number;
}) => void;

export const GroupBoard = <T extends Identifiable>({
  groups,
  renderItem,
}: {
  groups: GroupHook<T>[];
  renderItem: (item: T) => JSX.Element;
}) => {
  const onMove: OnMove = ({ fromGroupId, fromIndex, toGroupId, toIndex }) => {
    const fromGroup = groups.find((group) => group.id === fromGroupId);
    const toGroup = groups.find((group) => group.id === toGroupId);

    if (fromGroup === undefined || toGroup === undefined) return;

    const targetItem = fromGroup.findByIndex(fromIndex);
    if (!targetItem) return;

    fromGroup.removeItem(fromIndex);
    toGroup.insertItem(toIndex, targetItem);
  };

  return (
    <GroupContext onMove={onMove}>
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
