import { cva } from "class-variance-authority";
import { type DropResult } from "react-beautiful-dnd";
import { type Todo, useTodoListGroup } from "./board-hook";
import { Draggable, Droppable, DragDropContext } from "@/components";

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
              <Draggable draggableId={item.id} index={index} key={item.id}>
                <Item item={item}></Item>
              </Draggable>
            ))}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

const Item = ({ item }: { item: Todo }) => {
  return <div>{item.content}</div>;
};

const laneGroupStyle = cva("grid grid-rows-4 grid-cols-2");
