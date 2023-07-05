import { type OnDragEndResponder } from "react-beautiful-dnd";
import { Draggable, Droppable, DragDropContext } from "@/components";
import { PropsWithChildren } from "react";
import { BoardLayout } from ".";
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

export const Board = ({
  groups,
  onDragEnd,
}: {
  groups: GroupInput[];
  onDragEnd: OnDragEndResponder;
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
              <GroupItem
                itemId={item.id}
                item={item}
                index={index}
                key={item.id}
              ></GroupItem>
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
  item,
  index,
}: {
  itemId: string;
  item: Todo;
  index: number;
}) => {
  return (
    <Draggable draggableId={itemId} index={index} key={itemId}>
      <div>{item.content}</div>
    </Draggable>
  );
};

const GroupStyle = cva("h-40");
