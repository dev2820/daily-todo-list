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
}

export const TodoList = ({ todos, onSortEnd, renderTodo }: TodoListProp) => {
  return (
    <_TodoList
      useDragHandle
      items={todos}
      onSortEnd={onSortEnd}
      renderItem={renderTodo}
    ></_TodoList>
  );
};

const _TodoList: React.ComponentClass<
  SortableContainerProps & {
    items: Todo[];
    renderItem: (todo: Todo) => JSX.Element;
  }
> = SortableContainer(
  ({
    items,
    renderItem,
  }: {
    items: Todo[];
    renderItem: (todo: Todo) => JSX.Element;
  }) => {
    return (
      <ul>
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
    <li className={style()}>
      <DragHandle></DragHandle>
      {children}
    </li>
  );
});

const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);

const style = cva([
  "py-2 rounded-md",
  "flex gap-x-2",
  "hover:bg-slate-200/50",
  "duration-200",
]);
