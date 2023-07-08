import { cva } from "class-variance-authority";
import { Draggable as _Draggable } from "react-beautiful-dnd";
import { type PropsWithChildren } from "react";

export const Draggable = ({
  draggableId,
  index,
  children,
}: PropsWithChildren<{
  draggableId: string;
  index: number;
}>) => {
  return (
    <_Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={itemStyle({
            isDraggingOver: snapshot.isDragging,
          })}
        >
          {children}
        </div>
      )}
    </_Draggable>
  );
};

const itemStyle = cva("", {
  variants: {
    isDraggingOver: {
      true: "bg-surface-light drop-shadow-lg",
      false: "bg-surface",
    },
  },
});
