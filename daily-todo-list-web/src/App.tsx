import { TodoNote } from "@/components";
import { useTodoList } from "@/hooks";
import { cva } from "class-variance-authority";

function App() {
  const todoList = useTodoList([
    { id: "0", content: "Todo A", done: false },
    { id: "1", content: "Todo B", done: true },
    { id: "2", content: "Todo C", done: false },
  ]);

  const style = {
    height: "500px",
  };

  return (
    <div className="flex w-full gap-x-2">
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="월요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="화요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="수요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="목요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="금요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="토요일"
        todoListHook={todoList}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="일요일"
        todoListHook={todoList}
      ></TodoNote>
    </div>
  );
}

const todoNoteStyle = cva("grow");

export default App;
