import { TodoNote } from "@/components";
import { useDailyTodoList } from "@/hooks";
import { cva } from "class-variance-authority";

function App() {
  const dailyTodoList = useDailyTodoList();
  const todoNotes = [
    { title: "월요일", todoList: dailyTodoList.mon },
    { title: "화요일", todoList: dailyTodoList.tue },
    { title: "수요일", todoList: dailyTodoList.wed },
    { title: "목요일", todoList: dailyTodoList.thr },
    { title: "금요일", todoList: dailyTodoList.fri },
    { title: "토요일", todoList: dailyTodoList.sat },
    { title: "일요일", todoList: dailyTodoList.sun },
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
          {...todoNote.todoList}
        ></TodoNote>
      ))}
    </div>
  );
}

const todoNoteStyle = cva("grow");
const todoNoteListStyle = cva("flex w-full gap-x-2");
export default App;
