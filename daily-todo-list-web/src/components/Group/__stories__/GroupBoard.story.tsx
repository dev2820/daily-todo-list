import type { Meta } from "@storybook/react";
import { type DropResult } from "react-beautiful-dnd";

import { GroupBoard, Todo } from "..";
import { useGroup } from "../group-hook";
import { uid } from "@/utils";

const meta = {
  title: "Components/Group/GroupBoard",
  component: GroupBoard,
} satisfies Meta<typeof GroupBoard>;

export default meta;

export const Default = {
  render: () => <Example></Example>,
};

const Example = () => {
  const group1 = useGroup<Todo>("월", [
    { id: uid(), content: "A" },
    { id: uid(), content: "B" },
  ]);
  const group2 = useGroup<Todo>("화", [
    { id: uid(), content: "C" },
    { id: uid(), content: "D" },
  ]);
  const group3 = useGroup<Todo>("수", [
    { id: uid(), content: "E" },
    { id: uid(), content: "F" },
  ]);
  const groups = [group1, group2, group3];

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

    const targetItem = sourceGroup.findByIndex(source.index);

    sourceGroup.removeItem(source.index);
    destinationGroup.insertItem(destination.index, targetItem);
  };

  const renderItem = (item: Todo) => <div>{item.content}</div>;

  return (
    <GroupBoard
      groups={groups}
      onDragEnd={onDragEnd}
      renderItem={renderItem}
    ></GroupBoard>
  );
};
