import { useEffect } from "react";
import { cva } from "class-variance-authority";
import { TodoNote } from "@/components";
import { useDailyTodoList, type DailyTodoList } from "@/hooks";
import { useDailyTodoService, type DailyTodoService } from "@/services";
import { DAY, DAYS, type Day } from "@/constants";
import { dateFormat, ONE_DAY_MS } from "@/utils";

function App() {
  const dailyTodoService = useDailyTodoService();
  const initialTodoMap = dailyTodoService.readAll();
  const dailyTodoList = useDailyTodoList([
    initialTodoMap[DAY.MON],
    initialTodoMap[DAY.TUE],
    initialTodoMap[DAY.WED],
    initialTodoMap[DAY.THR],
    initialTodoMap[DAY.FRI],
    initialTodoMap[DAY.SAT],
    initialTodoMap[DAY.SUN],
  ]);

  useEffect(() => {
    saveTodos(dailyTodoService, dailyTodoList);
  }, [dailyTodoList, dailyTodoService]);

  const saveTodos = (service: DailyTodoService, dailyTodos: DailyTodoList) => {
    DAYS.forEach((key: Day) => {
      if (key === DAY.MON) service.write(key, dailyTodos[DAY.MON].todos);
      if (key === DAY.TUE) service.write(key, dailyTodos[DAY.TUE].todos);
      if (key === DAY.WED) service.write(key, dailyTodos[DAY.WED].todos);
      if (key === DAY.THR) service.write(key, dailyTodos[DAY.THR].todos);
      if (key === DAY.FRI) service.write(key, dailyTodos[DAY.FRI].todos);
      if (key === DAY.SAT) service.write(key, dailyTodos[DAY.SAT].todos);
      if (key === DAY.SUN) service.write(key, dailyTodos[DAY.SUN].todos);
    });
  };
  const todoNotes = [
    { title: "월요일", todoList: dailyTodoList[DAY.MON] },
    { title: "화요일", todoList: dailyTodoList[DAY.TUE] },
    { title: "수요일", todoList: dailyTodoList[DAY.WED] },
    { title: "목요일", todoList: dailyTodoList[DAY.THR] },
    { title: "금요일", todoList: dailyTodoList[DAY.FRI] },
    { title: "토요일", todoList: dailyTodoList[DAY.SAT] },
    { title: "일요일", todoList: dailyTodoList[DAY.SUN] },
  ];

  return (
    <div className="h-full">
      <header className={headerStyle()}>Todo</header>
      <div className={todoNoteListStyle()}>
        {todoNotes.map((todoNote, index) => (
          <TodoNote
            className={todoNoteStyle()}
            title={Title({
              title: todoNote.title,
              date: new Date(Date.now() + ONE_DAY_MS * index),
            })}
            {...todoNote.todoList}
          ></TodoNote>
        ))}
      </div>
    </div>
  );
}

const Title = ({ title, date }: { title: string; date: Date }) => {
  const dateStyle = cva("text-xs");
  const leadingStyle = cva("text-lg");
  const titleStyle = cva("", {
    variants: {
      today: {
        true: "text-emerald-500",
        false: "",
      },
    },
  });

  return (
    <div
      className={titleStyle({ today: date.getDay() === new Date().getDay() })}
    >
      <span className={leadingStyle()}>{title} </span>
      <span className={dateStyle()}>{dateFormat(date, "mm/dd")}</span>
    </div>
  );
};

const todoNoteStyle = cva("grow");
const todoNoteListStyle = cva(
  "h-[calc(100%-2rem)] grid grid-cols-4 grid-rows-2 w-full gap-x-2 gap-y-2"
);
const headerStyle = cva("h-[2rem] text-on-surface");

export default App;
