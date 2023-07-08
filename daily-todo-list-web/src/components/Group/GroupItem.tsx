import { PropsWithChildren } from "react";
import { Draggable } from "@/components";

export const GroupItem = ({
  itemId,
  children,
  index,
}: PropsWithChildren<{
  itemId: string;
  index: number;
}>) => {
  return (
    <Draggable draggableId={itemId} index={index} key={itemId}>
      {children}
    </Draggable>
  );
};
