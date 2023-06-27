import { Todo } from "@/hooks";

type Day = "mon" | "tue" | "wed" | "thr" | "fri" | "sat" | "sun";

export const dailyTodoService = () => {
  const mockTodoList: Record<Day, Todo[]> = {
    mon: [{ id: "0", content: "Todo A in Monday", done: false }],
    tue: [],
    wed: [],
    thr: [],
    fri: [{ id: "1", content: "Todo B in Friday", done: false }],
    sat: [],
    sun: [],
  };

  const read = (day: Day) => mockTodoList[day];

  const readAll = () => ({
    mon: readMon(),
    tue: readTue(),
    wed: readWed(),
    thr: readThr(),
    fri: readFri(),
    sat: readSat(),
    sun: readSun(),
  });

  const readMon = () => read("mon");
  const readTue = () => read("tue");
  const readWed = () => read("wed");
  const readThr = () => read("thr");
  const readFri = () => read("fri");
  const readSat = () => read("sat");
  const readSun = () => read("sun");

  const write = (day: Day, newTodoList: Todo[]) => {
    mockTodoList[day] = newTodoList;

    return true;
  };

  const writeMon = (newTodoList: Todo[]) => write("mon", newTodoList);
  const writeTue = (newTodoList: Todo[]) => write("tue", newTodoList);
  const writeWed = (newTodoList: Todo[]) => write("wed", newTodoList);
  const writeThr = (newTodoList: Todo[]) => write("thr", newTodoList);
  const writeFri = (newTodoList: Todo[]) => write("fri", newTodoList);
  const writeSat = (newTodoList: Todo[]) => write("sat", newTodoList);
  const writeSun = (newTodoList: Todo[]) => write("sun", newTodoList);

  return {
    read,
    readAll,
    readMon,
    readTue,
    readWed,
    readThr,
    readFri,
    readSat,
    readSun,
    write,
    writeMon,
    writeTue,
    writeWed,
    writeThr,
    writeFri,
    writeSat,
    writeSun,
  };
};
