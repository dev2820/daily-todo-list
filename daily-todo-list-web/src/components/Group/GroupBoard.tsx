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
import { useGroupBoard, type OnMove } from "./group-board-hook";
import { type Identifiable } from "@/components/types";

export type OnDragEnd = (result: DropResult) => void;

export const GroupBoard = <T extends Identifiable>({
  groups,
  ItemComponent,
}: {
  groups: GroupHook<T>[];
  ItemComponent: React.ComponentType<{ item: T }>;
}) => {
  const groupBoard = useGroupBoard(groups);

  return (
    <GroupContext onMove={groupBoard.move}>
      <BoardLayout>
        {groups.map((group) => (
          <div>
            <h3>{group.id}</h3>
            <Group groupId={group.id} key={group.id} className={GroupStyle()}>
              {group.items.map((item, index) => (
                <GroupItem itemId={item.id} index={index} key={item.id}>
                  <ItemComponent item={item}></ItemComponent>
                </GroupItem>
              ))}
            </Group>
          </div>
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
