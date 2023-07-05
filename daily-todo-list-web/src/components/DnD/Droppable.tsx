import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";
import { Droppable as _Droppable } from "react-beautiful-dnd";

export const Droppable = ({
  droppableId,
  children,
}: PropsWithChildren<{
  key: string;
  droppableId: string;
}>) => {
  return (
    <div>
      <_Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={listStyle({ isDraggingOver: snapshot.isDraggingOver })}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </_Droppable>
    </div>
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
