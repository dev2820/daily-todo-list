import { Button } from "primereact/button";
import { HelloWorld, TodoList, TodoItem } from "@/components";
import { useTodoList, type Todo } from "@/hooks";

function App() {
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const renderTodo = (todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onDo={() => todoList.doit(todo.id)}
        onUndo={() => todoList.undo(todo.id)}
        onRemove={() => todoList.removeTodo(todo.id)}
        onChangeContent={(content: string) =>
          todoList.changeContent(todo.id, content)
        }
      ></TodoItem>
    );
  };

  const onAddTodo = () => {
    todoList.addTodo();
  };

  return (
    <>
      <HelloWorld className={"color-red"}></HelloWorld>
      <TodoList
        renderTodo={renderTodo}
        todos={todoList.todos}
        onSortEnd={todoList.sort}
      ></TodoList>
      <Button onClick={onAddTodo}>Add Todo</Button>
    </>
  );
}

export default App;
