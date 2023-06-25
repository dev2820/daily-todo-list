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
  SortableElementProps & { value: Todo }
> = SortableElement(({ value }: { value: Todo }) => (
  <li>
    <TodoItem todo={value}></TodoItem>
  </li>
));

export const SortableList: React.ComponentClass<
  SortableContainerProps & { items: Todo[] },
  { items: Todo[] }
> = SortableContainer(({ items }: { items: Todo[] }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
        ></SortableItem>
      ))}
    </ul>
  );
});

export const TodoList = () => {
  const [items, setItems] = useState<Todo[]>([
    { content: "Todo A", done: false },
    { content: "Todo B", done: true },
    { content: "Todo C", done: false },
  ]);
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
  return <SortableList items={items} onSortEnd={onSortEnd}></SortableList>;
};
