import { cva } from "class-variance-authority";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "react-beautiful-dnd";
import { type Todo, useTodoListGroup } from "./board-hook";

export const Board = () => {
  const { todoListTable, removeItem, insertItem, findItem, MON_KEY, TUE_KEY } =
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
      <div>
        <Lane
          droppableId={MON_KEY}
          items={todoListTable.get(MON_KEY)?.items ?? []}
          key="1"
        ></Lane>
        <Lane
          droppableId={TUE_KEY}
          items={todoListTable.get(TUE_KEY)?.items ?? []}
          key="2"
        ></Lane>
      </div>
    </DragDropContext>
  );
};

const Lane = ({
  droppableId,
  items,
}: {
  key: string;
  droppableId: string;
  items: Todo[];
}) => {
  return (
    <div>
      {droppableId}
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={listStyle({ isDraggingOver: snapshot.isDraggingOver })}
          >
            {items.map((item, index) => (
              <Item item={item} index={index} key={item.id}></Item>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

const Item = ({ item, index }: { item: Todo; index: number }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={listStyle({
            isDraggingOver: snapshot.isDragging,
          })}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
};

const listStyle = cva("grid w-[250px]", {
  variants: {
    isDraggingOver: {
      true: "bg-red-400",
      false: "bg-slate-600",
    },
  },
});
