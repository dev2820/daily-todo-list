import { type Todo } from "@/hooks";
import {
  SortableElement,
  SortableContainer,
  type SortableElementProps,
  type SortableContainerProps,
} from "react-sortable-hoc";

export const TodoItem: React.ComponentClass<
  SortableElementProps & { value: Todo }
> = SortableElement(({ value }: { value: Todo }) => <li>{value.content}</li>);

export const TodoList: React.ComponentClass<
  SortableContainerProps & { items: Todo[] },
  { items: Todo[] }
> = SortableContainer(({ items }: { items: Todo[] }) => {
  return (
    <ul>
      {items.map((value, index) => (
        <TodoItem key={`item-${index}`} index={index} value={value}></TodoItem>
      ))}
    </ul>
  );
});
