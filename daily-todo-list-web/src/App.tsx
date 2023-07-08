import { useEffect, type MouseEvent } from "react";
import { cva } from "class-variance-authority";
import { useDailyTodoList, type DailyTodoList, type Todo } from "@/hooks";
import { useDailyTodoService, type DailyTodoService } from "@/services";
import { DAY, DAYS, type Day } from "@/constants";
import { ONE_DAY_MS } from "@/utils";
import {
  useGroup,
  GroupContext,
  BoardLayout,
  Group,
  GroupItem,
  NoteLayout,
  Button,
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
      if (key === DAY.MON) service.write(key, dailyTodos[DAY.MON].todos);
      if (key === DAY.TUE) service.write(key, dailyTodos[DAY.TUE].todos);
      if (key === DAY.WED) service.write(key, dailyTodos[DAY.WED].todos);
      if (key === DAY.THR) service.write(key, dailyTodos[DAY.THR].todos);
      if (key === DAY.FRI) service.write(key, dailyTodos[DAY.FRI].todos);
      if (key === DAY.SAT) service.write(key, dailyTodos[DAY.SAT].todos);
      if (key === DAY.SUN) service.write(key, dailyTodos[DAY.SUN].todos);
    });
  };

  const todoNotesGroup = [
    useGroup<Todo>("월요일", initialTodoMap[DAY.MON]),
    useGroup<Todo>("화요일", initialTodoMap[DAY.TUE]),
    useGroup<Todo>("수요일", initialTodoMap[DAY.WED]),
    useGroup<Todo>("목요일", initialTodoMap[DAY.THR]),
    useGroup<Todo>("금요일", initialTodoMap[DAY.FRI]),
    useGroup<Todo>("토요일", initialTodoMap[DAY.SAT]),
    useGroup<Todo>("일요일", initialTodoMap[DAY.SUN]),
  ];
  console.log(initialTodoMap[DAY.MON], todoNotesGroup);

  return (
    <div className="h-full">
      <header className={headerStyle()}>Todo</header>
      <TodoBoard
        groups={dailyTodoList}
        ItemComponent={TodoComponent}
      ></TodoBoard>
    </div>
  );
}

const TodoBoard = ({
  groups,
  ItemComponent,
}: {
  groups: DailyTodoList;
  ItemComponent: React.ComponentType<{ item: Todo }>;
}) => {
  const calcDayOfWeek = (day: number) =>
    new Date(Date.now() + ONE_DAY_MS * (day - new Date().getDay()));

  return (
    <GroupContext onMove={groups.move}>
      <BoardLayout>
        {groups.all.map((group, index) => (
          <div key={index}>
            <NoteLayout
              title={Title({ title: group.id, date: calcDayOfWeek(index) })}
              trailing={AddTodoButton({ onClick: group.addTodo })}
            >
              <Group groupId={group.id} key={group.id} className={GroupStyle()}>
                {group.items.map((item, index) => (
                  <GroupItem itemId={item.id} index={index} key={item.id}>
                    <ItemComponent item={item}></ItemComponent>
                  </GroupItem>
                ))}
              </Group>
            </NoteLayout>
          </div>
        ))}
      </BoardLayout>
    </GroupContext>
  );
};
const TodoComponent = ({ item }: { item: Todo }) => {
  return <div>{item.content}</div>;
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

const GroupStyle = cva("h-40");
const headerStyle = cva("h-[2rem] text-gray-800");

export default App;
