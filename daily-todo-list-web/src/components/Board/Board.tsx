import { type DropResult, type OnDragEndResponder } from "react-beautiful-dnd";
import { type Todo, useTodoListGroup } from "./todo-list-group";
import { Draggable, Droppable, DragDropContext } from "@/components";
import { PropsWithChildren } from "react";
import { BoardLayout } from ".";
import { cva } from "class-variance-authority";

export const Board = () => {
  const { todoListTable, removeItem, insertItem, findItem, KEYS } =
    useTodoListGroup();

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;
    if (!destination || !source) return;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    const targetItem = findItem(sourceId, source.index);
    if (!targetItem) return;

    removeItem(sourceId, source.index);
    insertItem(destinationId, destination.index, targetItem);
  };

  const getTodoList = (key: string) => todoListTable.get(key)?.items ?? [];

  return (
    <GroupContext onDragEnd={onDragEnd}>
      <BoardLayout>
        {KEYS.map((key) => (
          <Group groupId={key} key={key} className={GroupStyle()}>
            {getTodoList(key).map((item, index) => (
              <GroupItem itemId={item.id} item={item} index={index}></GroupItem>
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
