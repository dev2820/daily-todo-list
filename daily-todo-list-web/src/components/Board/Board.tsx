import { type DropResult, type OnDragEndResponder } from "react-beautiful-dnd";
import { Draggable, Droppable, DragDropContext } from "@/components";
import { PropsWithChildren } from "react";
import { BoardLayout } from ".";
import { cva } from "class-variance-authority";
import { type GroupHook, useGroup } from "./group-hook";
import { uid } from "@/utils/uid";

const MON_KEY = "월";
const TUE_KEY = "화";
const WED_KEY = "수";
export type Todo = {
  id: string;
  content: string;
};

export const Board = () => {
  // const { todoListTable, removeItem, insertItem, findItem, KEYS } =
  //   useTodoListGroup();
  const KEYS = [MON_KEY, TUE_KEY, WED_KEY];
  const todoListTable: Record<string, GroupHook<Todo>> = {
    [MON_KEY]: useGroup<Todo>([
      { id: uid(), content: "A" },
      { id: uid(), content: "B" },
    ]),
    [TUE_KEY]: useGroup<Todo>([
      { id: uid(), content: "C" },
      { id: uid(), content: "D" },
    ]),
    [WED_KEY]: useGroup<Todo>([
      { id: uid(), content: "E" },
      { id: uid(), content: "F" },
    ]),
  };
  const onDragEnd = (dropResult: DropResult) => {
    const { destination, source } = dropResult;
    if (!destination || !source) return;
    const sourceId = source.droppableId;

    const todoList = todoListTable[sourceId];
    if (!todoList) return;
    const targetItem = todoList.findByIndex(source.index);
    if (!targetItem) return;

    todoList.removeItem(source.index);
    todoList.insertItem(destination.index, targetItem);
  };

  const getTodoList = (key: string) => todoListTable[key]?.items ?? [];

  return (
    <GroupContext onDragEnd={onDragEnd}>
      <BoardLayout>
        {KEYS.map((key) => (
          <Group groupId={key} key={key} className={GroupStyle()}>
            {getTodoList(key).map((item, index) => (
              <GroupItem itemId={item.id} item={item} index={index}></GroupItem>
            ))}
          </Group>
        ))}
      </BoardLayout>
    </GroupContext>
  );
};

const GroupContext = ({
  children,
  onDragEnd,
}: PropsWithChildren<{ onDragEnd: OnDragEndResponder }>) => {
  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

const Group = ({
  children,
  groupId,
  className,
}: PropsWithChildren<{ className?: string; groupId: string }>) => {
  return (
    <Droppable droppableId={groupId} key={groupId} className={className}>
      {children}
    </Droppable>
  );
};

const GroupItem = ({
  itemId,
  item,
  index,
}: {
  itemId: string;
  item: Todo;
  index: number;
}) => {
  return (
    <Draggable draggableId={itemId} index={index} key={itemId}>
      <div>{item.content}</div>
    </Draggable>
  );
};

const GroupStyle = cva("h-40");
