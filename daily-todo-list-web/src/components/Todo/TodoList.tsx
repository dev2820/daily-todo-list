import { type Todo } from "@/hooks";
import {
  SortableElement,
  SortableContainer,
  SortableHandle,
  SortEndHandler,
  type SortableElementProps,
  type SortableContainerProps,
} from "react-sortable-hoc";
import { cva } from "class-variance-authority";
import { DragHandle as _DragHandle } from "@/components";

const style = cva([
  "py-2 px-3 rounded-md",
  "flex gap-x-4",
  "hover:bg-slate-200/50",
  "duration-200",
]);
const todoStyle = cva(["grow"]);

export const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);

export const SortableItem = <T extends { renderItem: () => JSX.Element }>() =>
  SortableElement(({ renderItem }: SortableElementProps & T) => {
    return (
      <li className={style()}>
        <DragHandle></DragHandle>
        <div className={todoStyle()}>{renderItem()}</div>
      </li>
    );
  }) as React.ComponentClass<SortableElementProps & T>;

export interface SortableListProps<T> extends SortableContainerProps {
  items: T[];
  renderItem: (item: T, id: string) => JSX.Element;
}

export const SortableList = <T extends { id: string }>() =>
  SortableContainer(({ items, renderItem }: SortableListProps<T>) => {
    const _SortableItem = SortableItem();

    return (
      <ul>
        {items.map((value, index) => (
          <_SortableItem
            key={`item-${value.id}`}
            index={index}
            renderItem={() => renderItem(value, value.id)}
          ></_SortableItem>
        ))}
      </ul>
    );
  }) as React.ComponentClass<SortableListProps<T>>;

interface TodoListProp {
  todos: Todo[];
  onSortEnd: SortEndHandler;
  renderTodo: (todo: Todo, id: string) => JSX.Element;
}

export const TodoList = ({ todos, onSortEnd, renderTodo }: TodoListProp) => {
  const _TodoList = SortableList<Todo>();
  return (
    <_TodoList
      useDragHandle
      items={todos}
      onSortEnd={onSortEnd}
      renderItem={renderTodo}
    ></_TodoList>
  );
};
