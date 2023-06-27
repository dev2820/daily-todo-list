import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { TodoNote } from "@/components";
import { useDailyTodoList } from "@/hooks";
import { useDailyTodoService, DAYS, DAY, type Day } from "@/services";

function App() {
  const dailyTodoService = useDailyTodoService();
  const initialTodoMap = dailyTodoService.readAll();
  const dailyTodoList = useDailyTodoList([
    initialTodoMap.mon,
    initialTodoMap.tue,
    initialTodoMap.wed,
    initialTodoMap.thr,
    initialTodoMap.fri,
    initialTodoMap.sat,
    initialTodoMap.sun,
  ]);

  const saveTodos = () => {
    DAYS.forEach((key: Day) => {
      if (key === DAY.MON) dailyTodoService.write(key, dailyTodoList.mon.todos);
      if (key === DAY.TUE) dailyTodoService.write(key, dailyTodoList.tue.todos);
      if (key === DAY.WED) dailyTodoService.write(key, dailyTodoList.wed.todos);
      if (key === DAY.THR) dailyTodoService.write(key, dailyTodoList.thr.todos);
      if (key === DAY.FRI) dailyTodoService.write(key, dailyTodoList.fri.todos);
      if (key === DAY.SAT) dailyTodoService.write(key, dailyTodoList.sat.todos);
      if (key === DAY.SUN) dailyTodoService.write(key, dailyTodoList.sun.todos);
    });
  };

  useEffect(() => {
    return () => {
      saveTodos();
    };
  }, []);

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
