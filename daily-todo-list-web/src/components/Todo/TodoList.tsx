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
export interface TodoItemProps<T> {
  value: T;
}
export type SortableItemProp<T> = SortableElementProps & T;

export const SortableItem = <T,>() => {
  return SortableElement(
    ({
      renderItem,
    }: { value: T } & {
      renderItem: () => JSX.Element;
    } & SortableItemProp<T>) => {
      return (
        <li className={style()}>
          <DragHandle></DragHandle>
          <div className={todoStyle()}>{renderItem()}</div>
        </li>
      );
    }
  ) as React.ComponentClass<
    SortableItemProp<TodoItemProps<T>> & {
      renderItem: () => JSX.Element;
    }
  >;
};

type RenderItemFunction<T> = (item: T, index: number) => JSX.Element;

export interface SortableListProps<T> extends SortableContainerProps {
  items: T[];
  renderItem: RenderItemFunction<T>;
}

export const SortableList = <T extends { id: string }>() => {
  return SortableContainer(({ items, renderItem }: SortableListProps<T>) => {
    const _SortableItem = SortableItem<T>();
    return (
      <ul>
        {items.map((value, index) => (
          <_SortableItem
            key={`item-${value.id}`}
            index={index}
            value={value}
            renderItem={() => renderItem(value, index)}
          ></_SortableItem>
        ))}
      </ul>
    );
  }) as React.ComponentClass<SortableListProps<T>>;
};

interface TodoList2Prop {
  todos: Todo[];
  onSortEnd: SortEndHandler;
  renderTodo: (todo: Todo, index: number) => JSX.Element;
}

export const TodoList = ({ todos, onSortEnd, renderTodo }: TodoList2Prop) => {
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
