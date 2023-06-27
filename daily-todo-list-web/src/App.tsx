import { TodoNote } from "@/components";
import { useDailyTodoList } from "@/hooks";
import { cva } from "class-variance-authority";

function App() {
  const dailyTodoList = useDailyTodoList();

  const style = {
    height: "500px",
  };

  return (
    <div className={todoNoteListStyle()}>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="월요일"
        todoListHook={dailyTodoList.mon}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="화요일"
        todoListHook={dailyTodoList.tue}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="수요일"
        todoListHook={dailyTodoList.wed}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="목요일"
        todoListHook={dailyTodoList.thr}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="금요일"
        todoListHook={dailyTodoList.fri}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="토요일"
        todoListHook={dailyTodoList.sat}
      ></TodoNote>
      <TodoNote
        className={todoNoteStyle()}
        style={style}
        title="일요일"
        todoListHook={dailyTodoList.sun}
      ></TodoNote>
    </div>
  );
}

const todoNoteStyle = cva("grow");
const todoNoteListStyle = cva("flex w-full gap-x-2");
export default App;
