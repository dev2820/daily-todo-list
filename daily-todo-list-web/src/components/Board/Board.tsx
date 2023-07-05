import { cva } from "class-variance-authority";
import { type DropResult, type OnDragEndResponder } from "react-beautiful-dnd";
import { type Todo, useTodoListGroup } from "./todo-list-group";
import { Draggable, Droppable, DragDropContext } from "@/components";
import { PropsWithChildren } from "react";

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
      {KEYS.map((key) => (
        <Group groupId={key} key={key}>
          {getTodoList(key).map((item, index) => (
            <GroupItem itemId={item.id} item={item} index={index}></GroupItem>
          ))}
        </Group>
      ))}
    </GroupContext>
  );
};

const GroupContext = ({
  children,
  onDragEnd,
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={laneGroupStyle()}>{children}</div>
    </DragDropContext>
  );
};

const Group = ({
  children,
  groupId,
}: PropsWithChildren<{ groupId: string }>) => {
  return (
    <Droppable droppableId={groupId} key={groupId}>
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

const laneGroupStyle = cva("grid grid-rows-4 grid-cols-2");
