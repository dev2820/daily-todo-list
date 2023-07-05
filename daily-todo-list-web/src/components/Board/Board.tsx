import { cva } from "class-variance-authority";
import {
  DragDropContext as _DragDropContext,
  type DropResult,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import { useTodoListGroup } from "./board-hook";
import { Draggable, Droppable } from "@/components";
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={laneGroupStyle()}>
        {KEYS.map((key) => (
          <Droppable droppableId={key} key={key}>
            {(todoListTable.get(key)?.items ?? []).map((item, index) => (
              <Draggable item={item} index={index} key={item.id}></Draggable>
            ))}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

const DragDropContext = ({
  onDragEnd,
  children,
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return <_DragDropContext onDragEnd={onDragEnd}>{children}</_DragDropContext>;
};

const laneGroupStyle = cva("grid grid-rows-4 grid-cols-2");
