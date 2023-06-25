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
  renderTodo: (id: string, todo: Todo) => JSX.Element;
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
    renderItem: (id: string, todo: Todo) => JSX.Element;
  }
> = SortableContainer(
  ({
    items,
    renderItem,
  }: {
    items: Todo[];
    renderItem: (id: string, todo: Todo) => JSX.Element;
  }) => {
    return (
      <ul>
        {items.map((value: Todo, index: number) => (
          <TodoItem key={`item-${value.id}`} index={index}>
            {renderItem(value.id, value)}
          </TodoItem>
        ))}
      </ul>
    );
  }
);

const TodoItem: React.ComponentClass<
  SortableElementProps & { children: JSX.Element }
> = SortableElement(({ children }: { children: JSX.Element }) => (
  <li className={style()}>
    <DragHandle></DragHandle>
    {children}
  </li>
));

const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);

const style = cva([
  "py-2 px-3 rounded-md",
  "flex gap-x-4",
  "hover:bg-slate-200/50",
  "duration-200",
]);
