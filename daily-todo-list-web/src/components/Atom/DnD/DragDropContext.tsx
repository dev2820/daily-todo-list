import { PropsWithChildren } from "react";
import {
  DragDropContext as _DragDropContext,
  type OnDragEndResponder,
} from "react-beautiful-dnd";

export const DragDropContext = ({
  onDragEnd,
  children,
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return <_DragDropContext onDragEnd={onDragEnd}>{children}</_DragDropContext>;
};
