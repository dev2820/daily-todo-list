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

interface TodoListProp {
  todos: Todo[];
  onSortEnd: SortEndHandler;
  renderTodo: (todo: Todo) => JSX.Element;
  className?: string;
}

export const TodoList = ({
  todos,
  onSortEnd,
  renderTodo,
  className,
}: TodoListProp) => {
  const todoListStyle = cva();

  return (
    <_TodoList
      className={todoListStyle({ className })}
      useDragHandle
      items={todos}
      onSortEnd={onSortEnd}
      renderItem={renderTodo}
    ></_TodoList>
  );
};

const _TodoList: React.ComponentClass<
  SortableContainerProps & {
    className?: string;
    items: Todo[];
    renderItem: (todo: Todo) => JSX.Element;
  }
> = SortableContainer(
  ({
    className,
    items,
    renderItem,
  }: {
    className?: string;
    items: Todo[];
    renderItem: (todo: Todo) => JSX.Element;
  }) => {
    return (
      <ul className={className ?? ""}>
        {items.map((value: Todo, index: number) => (
          <TodoItem key={`item-${value.id}`} index={index}>
            {renderItem(value)}
          </TodoItem>
        ))}
      </ul>
    );
  }
);

const TodoItem: React.ComponentClass<
  SortableElementProps & { children: JSX.Element }
> = SortableElement(({ children }: { children: JSX.Element }) => {
  return (
    <li className={todoItemStyle()}>
      <DragHandle></DragHandle>
      {children}
    </li>
  );
});

const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);

const todoItemStyle = cva([
  "py-2",
  "flex",
  "hover:bg-surface-light",
  "duration-200",
]);
