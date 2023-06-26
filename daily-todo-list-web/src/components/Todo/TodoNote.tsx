import { Button } from "primereact/button";
import { TodoList, TodoItem as _TodoItem } from ".";
import { useTodoList, type Todo } from "@/hooks";
import { cva } from "class-variance-authority";

interface Props {
  className?: string;
}
export const TodoNote = (props: Props) => {
  const { className } = props;
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const TodoItem = (todo: Todo) => (
    <_TodoItem
      todo={todo}
      onDo={() => todoList.doit(todo.id)}
      onUndo={() => todoList.undo(todo.id)}
      onRemove={() => todoList.removeTodo(todo.id)}
      onChangeContent={(content: string) =>
        todoList.changeContent(todo.id, content)
      }
    ></_TodoItem>
  );

  return (
    <div className={`${style()} ${className}`}>
      <TodoList
        className={todoListStyle()}
        todos={todoList.todos}
        onSortEnd={todoList.sort}
        renderTodo={TodoItem}
      ></TodoList>
      <Button
        className={addTodoStyle()}
        label="Add Todo"
        onClick={todoList.addTodo}
      ></Button>
    </div>
  );
};

const style = cva("relative");
const todoListStyle = cva("h-[calc(100%-3rem)] overflow-auto");
const addTodoStyle = cva("w-full h-[3rem]");
