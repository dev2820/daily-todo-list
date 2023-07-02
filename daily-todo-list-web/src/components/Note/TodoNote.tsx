import {
  TodoList,
  TodoItem as _TodoItem,
  NoteLayout,
  type NoteLayoutProps,
} from "@/components";
import { TodoListHook, type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { KeyboardEvent } from "react";
import { Button } from "@/components";

interface Props extends NoteLayoutProps, TodoListHook {}

export const TodoNote = (props: Props) => {
  const {
    className,
    title,
    style,
    todos,
    sort,
    addTodo,
    doit,
    undo,
    removeTodo,
    changeContent,
  } = props;

  const TodoItem = (todo: Todo) => (
    <_TodoItem
      todo={todo}
      onDo={() => doit(todo.id)}
      onUndo={() => undo(todo.id)}
      onRemove={() => removeTodo(todo.id)}
      onChangeContent={(content: string) => changeContent(todo.id, content)}
      onKeyPress={onKeyPress}
    ></_TodoItem>
  );

  const onKeyPress = (event: KeyboardEvent, todo?: Todo) => {
    if (isShiftEnter(event)) {
      event.preventDefault();
      if (todo) addTodo({ nextTo: todo.id });
      else addTodo();
    }
  };

  const isShiftEnter = (event: KeyboardEvent) => {
    if (event.shiftKey && event.key === "Enter") return true;
  };

  const AddTodoButton = () => {
    return (
      <Button className={addTodoStyle()}>
        <i className="pi pi-plus" onClick={() => addTodo()}></i>
      </Button>
    );
  };

  return (
    <NoteLayout
      title={title}
      trailing={AddTodoButton()}
      style={style}
      className={`${todoNoteStyle()} ${className ?? ""}`}
    >
      <TodoList
        className={todoListStyle()}
        todos={todos}
        onSortEnd={sort}
        renderTodo={TodoItem}
      ></TodoList>
    </NoteLayout>
  );
};

const todoNoteStyle = cva("relative overflow-hidden");
const todoListStyle = cva("h-full overflow-y-auto overflow-x-hidden");
const addTodoStyle = cva([
  "py-1 px-2",
  "duration-200",
  "text-on-surface-dark",
  "hover:text-on-surface",
]);
