import { useTodoList, type Todo } from "@/hooks";
import {
  SortableElement,
  SortableContainer,
  SortableHandle,
  type SortableElementProps,
  type SortableContainerProps,
} from "react-sortable-hoc";
import { cva } from "class-variance-authority";
import { TodoItem } from ".";
import { DragHandle as _DragHandle } from "@/components";

export const DragHandle = SortableHandle(() => <_DragHandle></_DragHandle>);
export interface TodoItemProps {
  value: Todo;
  onDo: () => void;
  onUndo: () => void;
  onContentChange: (content: string) => void;
}
export type SortableItemProp<T> = SortableElementProps & T;

export const SortableItem: React.ComponentClass<
  SortableItemProp<TodoItemProps>
> = SortableElement(
  ({ value, onDo, onUndo, onContentChange }: TodoItemProps) => {
    const style = cva([
      "p-2 rounded-md",
      "flex gap-x-2",
      "hover:bg-slate-200/50",
      "duration-200",
    ]);

    return (
      <li className={style()}>
        <DragHandle></DragHandle>
        <TodoItem
          todo={value}
          onDo={onDo}
          onUndo={onUndo}
          onChangeContent={onContentChange}
        ></TodoItem>
      </li>
    );
  }
);

export interface TodoListProps {
  items: Todo[];
  onDo: (index: number) => void;
  onUndo: (index: number) => void;
  onContentChange: (index: number, content: string) => void;
}
export type SortableListProps<T> = SortableContainerProps & T;

export const SortableList: React.ComponentClass<
  SortableListProps<TodoListProps>
> = SortableContainer(
  ({ items, onDo, onUndo, onContentChange }: TodoListProps) => {
    return (
      <ul>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${index}`}
            index={index}
            value={value}
            onDo={() => onDo(index)}
            onUndo={() => onUndo(index)}
            onContentChange={(content: string) =>
              onContentChange(index, content)
            }
          ></SortableItem>
        ))}
      </ul>
    );
  }
);

export const TodoList = ({ initialTodos }: { initialTodos: Todo[] }) => {
  const { todos, sort, doit, undo, changeContent } = useTodoList(initialTodos);
  return (
    <SortableList
      useDragHandle
      items={todos}
      onSortEnd={sort}
      onDo={doit}
      onUndo={undo}
      onContentChange={changeContent}
    ></SortableList>
  );
};
