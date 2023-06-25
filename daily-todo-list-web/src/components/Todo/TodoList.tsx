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

export const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);
export interface TodoItemProps {
  value: Todo;
}
export type SortableItemProp<T> = SortableElementProps & T;

export const SortableItem: React.ComponentClass<
  SortableItemProp<TodoItemProps> & {
    renderItem: () => JSX.Element;
  }
> = SortableElement(
  ({
    renderItem,
  }: TodoItemProps & {
    renderItem: () => JSX.Element;
  }) => {
    const style = cva([
      "py-2 px-3 rounded-md",
      "flex gap-x-4",
      "hover:bg-slate-200/50",
      "duration-200",
    ]);
    const todoStyle = cva(["grow"]);

    return (
      <li className={style()}>
        <DragHandle></DragHandle>
        <div className={todoStyle()}>{renderItem()}</div>
      </li>
    );
  }
);

export type SortableListProps = SortableContainerProps & {
  items: Todo[];
};

export const SortableList: React.ComponentClass<
  SortableListProps & {
    renderItem: (todo: Todo, index: number) => JSX.Element;
  }
> = SortableContainer(
  ({
    items,
    renderItem,
  }: {
    items: Todo[];
    renderItem: (todo: Todo, index: number) => JSX.Element;
  }) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            renderItem={() => renderItem(value, index)}
          ></SortableItem>
        ))}
      </ul>
    );
  }
);

interface TodoList2Prop {
  todos: Todo[];
  onSortEnd: SortEndHandler;
  renderTodo: (todo: Todo, index: number) => JSX.Element;
}

export const TodoList = ({ todos, onSortEnd, renderTodo }: TodoList2Prop) => {
  return (
    <SortableList
      useDragHandle
      items={todos}
      onSortEnd={onSortEnd}
      renderItem={renderTodo}
    ></SortableList>
  );
};
