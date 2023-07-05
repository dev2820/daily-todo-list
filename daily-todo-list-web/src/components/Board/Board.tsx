import { cva } from "class-variance-authority";
import { type DropResult, type OnDragEndResponder } from "react-beautiful-dnd";
import { type Todo, useTodoListGroup } from "./board-hook";
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

  const renderDraggables = (items: Todo[] = []) => {
    return items.map((item, index) => (
      <Draggable draggableId={item.id} index={index} key={item.id}>
        <Item item={item}></Item>
      </Draggable>
    ));
  };

  return (
    <BoardContext onDragEnd={onDragEnd}>
      {KEYS.map((key) => (
        <Droppable droppableId={key} key={key}>
          {renderDraggables(todoListTable.get(key)?.items)}
        </Droppable>
      ))}
    </BoardContext>
  );
};

const BoardContext = ({
  children,
  onDragEnd,
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={laneGroupStyle()}>{children}</div>
    </DragDropContext>
  );
};

const Item = ({ item }: { item: Todo }) => {
  return <div>{item.content}</div>;
};

const laneGroupStyle = cva("grid grid-rows-4 grid-cols-2");
