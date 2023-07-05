import type { Meta } from "@storybook/react";
import { type DropResult } from "react-beautiful-dnd";

import { Board, Todo } from "..";
import { useGroup } from "../group-hook";
import { uid } from "@/utils";

const meta = {
  title: "Components/Board/Board",
  component: Board,
} satisfies Meta<typeof Board>;

export default meta;

export const Default = {
  render: () => <Example></Example>,
};

const Example = () => {
  const group1 = useGroup<Todo>([
    { id: uid(), content: "A" },
    { id: uid(), content: "B" },
  ]);
  const group2 = useGroup<Todo>([
    { id: uid(), content: "C" },
    { id: uid(), content: "D" },
  ]);
  const group3 = useGroup<Todo>([
    { id: uid(), content: "E" },
    { id: uid(), content: "F" },
  ]);
  const groups = [
    { groupName: "월", group: group1 },
    { groupName: "화", group: group2 },
    { groupName: "수", group: group3 },
  ];

  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;
    if (!destination || !source) return;
    const sourceGroupName = source.droppableId;
    const destGroupName = destination.droppableId;

    const sourceGroup = groups.find(
      (group) => group.groupName === sourceGroupName
    );
    const destinationGroup = groups.find(
      (group) => group.groupName === destGroupName
    );

    if (sourceGroup === undefined || destinationGroup === undefined) return;

    const targetItem = sourceGroup.group.findByIndex(source.index);

    sourceGroup.group.removeItem(source.index);
    destinationGroup.group.insertItem(destination.index, targetItem);
  };

  return <Board groups={groups} onDragEnd={onDragEnd}></Board>;
};
