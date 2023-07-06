import type { Meta } from "@storybook/react";
import { GroupBoard, type OnDragEnd } from "..";
import { useGroup } from "../group-hook";
import { uid } from "@/utils";
import { type Identifiable } from "@/components/types";

const meta = {
  title: "Components/Group/GroupBoard",
  component: GroupBoard,
} satisfies Meta<typeof GroupBoard>;

export default meta;

type Item = Identifiable & {
  content: string;
};
export const Default = {
  render: () => <Example></Example>,
};

const Example = () => {
  const group1 = useGroup<Item>("월", [
    { id: uid(), content: "A" },
    { id: uid(), content: "B" },
  ]);
  const group2 = useGroup<Item>("화", [
    { id: uid(), content: "C" },
    { id: uid(), content: "D" },
  ]);
  const group3 = useGroup<Item>("수", [
    { id: uid(), content: "E" },
    { id: uid(), content: "F" },
  ]);
  const groups = [group1, group2, group3];

  const onDragEnd: OnDragEnd = (dropResult) => {
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

  const renderItem = (item: Item) => <div>{item.content}</div>;

  return (
    <GroupBoard
      groups={groups}
      onDragEnd={onDragEnd}
      renderItem={renderItem}
    ></GroupBoard>
  );
};
