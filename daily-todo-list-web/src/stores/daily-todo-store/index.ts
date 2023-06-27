import { Todo } from "@/hooks";

type Day = "mon" | "tue" | "wed" | "thr" | "fri" | "sat" | "sun";

export const dailyTodoStore = () => {
  const mockTodoList: Record<Day, Todo[]> = {
    mon: [{ id: "0", content: "Todo A in Monday", done: false }],
    tue: [],
    wed: [],
    thr: [],
    fri: [{ id: "1", content: "Todo B in Friday", done: false }],
    sat: [],
    sun: [],
  };

  const _read = (day: Day) => mockTodoList[day];

  const readAll = () => ({
    mon: readMon(),
    tue: readTue(),
    wed: readWed(),
    thr: readThr(),
    fri: readFri(),
    sat: readSat(),
    sun: readSun(),
  });

  const readMon = () => _read("mon");
  const readTue = () => _read("tue");
  const readWed = () => _read("wed");
  const readThr = () => _read("thr");
  const readFri = () => _read("fri");
  const readSat = () => _read("sat");
  const readSun = () => _read("sun");

  const _write = (day: Day, newTodoList: Todo[]) => {
    mockTodoList[day] = newTodoList;

    return true;
  };

  const writeMon = (newTodoList: Todo[]) => _write("mon", newTodoList);
  const writeTue = (newTodoList: Todo[]) => _write("tue", newTodoList);
  const writeWed = (newTodoList: Todo[]) => _write("wed", newTodoList);
  const writeThr = (newTodoList: Todo[]) => _write("thr", newTodoList);
  const writeFri = (newTodoList: Todo[]) => _write("fri", newTodoList);
  const writeSat = (newTodoList: Todo[]) => _write("sat", newTodoList);
  const writeSun = (newTodoList: Todo[]) => _write("sun", newTodoList);

  return {
    read: _read,
    readAll,
    readMon,
    readTue,
    readWed,
    readThr,
    readFri,
    readSat,
    readSun,
    write: _write,
    writeMon,
    writeTue,
    writeWed,
    writeThr,
    writeFri,
    writeSat,
    writeSun,
  };
};
