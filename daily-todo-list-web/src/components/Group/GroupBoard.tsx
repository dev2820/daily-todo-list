import { type OnDragEndResponder } from "react-beautiful-dnd";
import {
  Draggable,
  Droppable,
  DragDropContext,
  BoardLayout,
} from "@/components";
import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";
import { type GroupHook } from "./group-hook";

export type Todo = {
  id: string;
  content: string;
};

type GroupInput = {
  groupName: string;
  group: GroupHook<Todo>;
};

export const GroupBoard = ({
  groups,
  onDragEnd,
  renderItem,
}: {
  groups: GroupInput[];
  onDragEnd: OnDragEndResponder;
  renderItem: (item: Todo) => JSX.Element;
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
            {group.group.items.map((item, index) => (
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
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
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
