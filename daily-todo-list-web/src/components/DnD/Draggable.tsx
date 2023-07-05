import { cva } from "class-variance-authority";
import { Draggable as _Draggable } from "react-beautiful-dnd";

interface Identifiable {
  id: string;
  content: string;
  [key: string]: unknown;
}
export const Draggable = ({
  item,
  index,
}: {
  item: Identifiable;
  index: number;
}) => {
  return (
    <_Draggable key={item.id} draggableId={item.id} index={index}>
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
    </_Draggable>
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
