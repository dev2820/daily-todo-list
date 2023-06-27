import {
  TodoList,
  TodoItem as _TodoItem,
  NoteLayout,
  type NoteLayoutProps,
} from "@/components";
import { TodoListHook, type Todo } from "@/hooks";
import { Button } from "primereact/button";
import { cva } from "class-variance-authority";

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
    ></_TodoItem>
  );

  return (
    <NoteLayout
      title={title}
      style={style}
      className={`${todoNoteStyle()} ${className ?? ""}`}
    >
      <TodoList
        className={todoListStyle()}
        todos={todos}
        onSortEnd={sort}
        renderTodo={TodoItem}
      ></TodoList>
      <div className={spaceStyle()}></div>
      <Button
        className={addTodoStyle()}
        label="Add Todo"
        onClick={addTodo}
      ></Button>
    </NoteLayout>
  );
};

const todoNoteStyle = cva("relative");
const todoListStyle = cva(
  "h-[calc(100%-3.5rem)] overflow-y-auto overflow-x-hidden"
);
const addTodoStyle = cva("w-full h-[3rem]");
const spaceStyle = cva("h-[0.5rem]");
