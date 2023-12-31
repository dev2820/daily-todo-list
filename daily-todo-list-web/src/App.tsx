import { useEffect, type MouseEvent } from "react";
import { cva } from "class-variance-authority";
import { useDailyTodoList, type DailyTodoList } from "@/hooks";
import { useDailyTodoService, type DailyTodoService } from "@/services";
import { DAY, DAYS, type Day } from "@/constants";
import { ONE_DAY_MS } from "@/utils";
import {
  GroupContext,
  BoardLayout,
  Group,
  GroupItem,
  NoteLayout,
  Button,
  TodoItem,
  DragHandle,
} from "@/components";

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
      service.write(key, dailyTodos[key].todos);
    });
  };

  return (
    <div className="h-full">
      <header className={headerStyle()}>Todo</header>
      <TodoBoard groups={dailyTodoList}></TodoBoard>
    </div>
  );
}

const TodoBoard = ({ groups }: { groups: DailyTodoList }) => {
  const calcDayOfWeek = (day: number) =>
    new Date(Date.now() + ONE_DAY_MS * (day - new Date().getDay() + 1));

  return (
    <GroupContext onMove={groups.move}>
      <BoardLayout className={"h-[calc(100%-2rem)]"}>
        {groups.all.map((group, index) => (
          <NoteLayout
            key={index}
            title={Title({ title: group.id, date: calcDayOfWeek(index) })}
            trailing={AddTodoButton({ onClick: group.addTodo })}
            className={"h-full"}
          >
            <Group groupId={group.id} key={group.id} className={GroupStyle()}>
              {group.items.map((item, index) => (
                <GroupItem itemId={item.id} index={index} key={item.id}>
                  <div className="flex flex-row p-2">
                    <DragHandle></DragHandle>
                    <TodoItem
                      todo={item}
                      onRemove={() => group.removeTodo(item.id)}
                      onChangeContent={(newContent: string) =>
                        group.changeContent(item.id, newContent)
                      }
                    ></TodoItem>
                  </div>
                </GroupItem>
              ))}
            </Group>
          </NoteLayout>
        ))}
      </BoardLayout>
    </GroupContext>
  );
};

const Title = ({ title, date }: { title: string; date: Date }) => {
  const leadingStyle = cva("text-lg");
  const titleStyle = cva("", {
    variants: {
      today: {
        true: "text-emerald-500",
        false: "",
      },
    },
  });
  console.log(date.getDay(), new Date().getDay());
  return (
    <div
      className={titleStyle({ today: date.getDay() === new Date().getDay() })}
    >
      <span className={leadingStyle()}>{title} </span>
    </div>
  );
};

const AddTodoButton = ({
  onClick,
}: {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <Button className={addTodoStyle()} onClick={onClick}>
      <i className="pi pi-plus"></i>
    </Button>
  );
};

const addTodoStyle = cva([
  "py-1 px-2",
  "duration-200",
  "text-on-surface-dark",
  "hover:text-on-surface",
]);

const GroupStyle = cva("h-full overflow-y-auto");
const headerStyle = cva("h-[2rem] text-gray-800");

export default App;
