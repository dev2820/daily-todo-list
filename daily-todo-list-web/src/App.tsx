import { HelloWorld, TodoList, TodoItem } from "@/components";
import { useTodoList, type Todo } from "@/hooks";

function App() {
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const renderTodo = (id: string, todo: Todo) => {
    return (
      <TodoItem
        todo={todo}
        onDo={() => todoList.doit(id)}
        onUndo={() => todoList.undo(id)}
        onChangeContent={(content: string) =>
          todoList.changeContent(id, content)
        }
      ></TodoItem>
    );
  };

  return (
    <>
      <HelloWorld className={"color-red"}></HelloWorld>
      <TodoList
        renderTodo={renderTodo}
        todos={todoList.todos}
        onSortEnd={todoList.sort}
      ></TodoList>
    </>
  );
}

export default App;
