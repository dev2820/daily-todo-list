import { useState } from "react";
import { type Todo } from "@/hooks";
import {
  SortableElement,
  SortableContainer,
  type SortableElementProps,
  type SortableContainerProps,
  arrayMove,
} from "react-sortable-hoc";
import { TodoItem } from ".";

export const SortableItem: React.ComponentClass<
  SortableElementProps & { value: Todo; onDo: () => void; onUndo: () => void }
> = SortableElement(
  ({
    value,
    onDo,
    onUndo,
  }: {
    value: Todo;
    onDo: () => void;
    onUndo: () => void;
  }) => (
    <li>
      <TodoItem todo={value} onDo={onDo} onUndo={onUndo}></TodoItem>
    </li>
  )
);

export const SortableList: React.ComponentClass<
  SortableContainerProps & {
    items: Todo[];
    onDo: (index: number) => void;
    onUndo: (index: number) => void;
  }
> = SortableContainer(
  ({
    items,
    onDo,
    onUndo,
  }: {
    items: Todo[];
    onDo: (index: number) => void;
    onUndo: (index: number) => void;
  }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            onDo={() => onDo(index)}
            onUndo={() => onUndo(index)}
          ></SortableItem>
        ))}
      </ul>
    );
  }
);

export const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [items, setItems] = useState<Todo[]>(todos);
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setItems((items) => {
      return arrayMove(items, oldIndex, newIndex);
    });
  };
  const doit = (index: number) => {
    setItems((oldItems) => {
      const newItems = [...oldItems];
      newItems[index].done = true;
      return newItems;
    });
  };
  const undo = (index: number) => {
    setItems((oldItems) => {
      const newItems = [...oldItems];
      newItems[index].done = false;
      return newItems;
    });
  };
  return (
    <SortableList
      items={items}
      onSortEnd={onSortEnd}
      onDo={doit}
      onUndo={undo}
    ></SortableList>
  );
};
