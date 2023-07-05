import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Droppable as _Droppable } from "react-beautiful-dnd";

export const Droppable = ({
  droppableId,
  className,
  children,
}: PropsWithChildren<{
  key: string;
  className?: string;
  droppableId: string;
}>) => {
  return (
    <_Droppable droppableId={droppableId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={listStyle({
            className: className,
            isDraggingOver: snapshot.isDraggingOver,
          })}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </_Droppable>
  );
};

const listStyle = cva("", {
  variants: {
    isDraggingOver: {
      true: "bg-red-400",
      false: "bg-slate-600",
    },
  },
});
