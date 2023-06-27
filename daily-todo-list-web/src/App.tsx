import { TodoNote } from "@/components";
import { useDailyTodoList } from "@/hooks";
import { cva } from "class-variance-authority";

function App() {
  const dailyTodoList = useDailyTodoList();
  const todoNotes = [
    { title: "월요일", todoListHook: dailyTodoList.mon },
    { title: "화요일", todoListHook: dailyTodoList.tue },
    { title: "수요일", todoListHook: dailyTodoList.wed },
    { title: "목요일", todoListHook: dailyTodoList.thr },
    { title: "금요일", todoListHook: dailyTodoList.fri },
    { title: "토요일", todoListHook: dailyTodoList.sat },
    { title: "일요일", todoListHook: dailyTodoList.sun },
  ];
  const style = {
    height: "500px",
  };

  return (
    <div className={todoNoteListStyle()}>
      {todoNotes.map((todoNote) => (
        <TodoNote
          className={todoNoteStyle()}
          style={style}
          title={todoNote.title}
          todoListHook={todoNote.todoListHook}
        ></TodoNote>
      ))}
    </div>
  );
}

const todoNoteStyle = cva("grow");
const todoNoteListStyle = cva("flex w-full gap-x-2");
export default App;
