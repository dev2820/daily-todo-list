import { BoardLayout } from "@/components";
import { GroupContext, GroupItem, Group } from "./index";
import { cva } from "class-variance-authority";
import { type GroupHook } from "./group-hook";
import { useGroupBoard } from "./group-board-hook";
import { type Identifiable } from "@/components/types";

export const GroupBoard = <T extends Identifiable>({
  groups,
  ItemComponent,
}: {
  groups: GroupHook<T>[];
  ItemComponent: React.ComponentType<{ item: T }>;
}) => {
  const groupBoard = useGroupBoard(groups);

  return (
    <GroupContext onMove={groupBoard.move}>
      <BoardLayout>
        {groups.map((group) => (
          <div>
            <h3>{group.id}</h3>
            <Group groupId={group.id} key={group.id} className={GroupStyle()}>
              {group.items.map((item, index) => (
                <GroupItem itemId={item.id} index={index} key={item.id}>
                  <ItemComponent item={item}></ItemComponent>
                </GroupItem>
              ))}
            </Group>
          </div>
        ))}
      </BoardLayout>
    </GroupContext>
  );
};

const GroupStyle = cva("h-40");
