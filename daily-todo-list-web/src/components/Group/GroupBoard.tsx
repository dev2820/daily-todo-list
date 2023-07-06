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
import { type Identifiable } from "@/components/types";

type OnDragEnd = (result: DropResult) => void;
export const GroupBoard = <T extends Identifiable>({
  groups,
  onDragEnd,
  renderItem,
}: {
  groups: GroupHook<T>[];
  onDragEnd: OnDragEnd;
  renderItem: (item: T) => JSX.Element;
}) => {
  return (
    <GroupContext onDragEnd={onDragEnd}>
      <BoardLayout>
        {groups.map((group) => (
          <Group
            groupId={group.groupName}
            key={group.groupName}
            className={GroupStyle()}
          >
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
