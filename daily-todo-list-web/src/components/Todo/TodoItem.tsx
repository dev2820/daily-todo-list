import { PropsWithChildren } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { Checkbox } from "primereact/checkbox";

interface Props {
  todo: Todo;
  onDo?: () => void;
  onUndo?: () => void;
}

export const TodoItem = ({ todo, onDo, onUndo }: PropsWithChildren<Props>) => {
  const style = cva([
    "p-2 rounded-md",
    "flex gap-x-2",
    "hover:bg-slate-200/50",
    "duration-200",
  ]);
  const flexCenterStyle = cva("my-auto");
  const contentStyle = cva(["m-0 p-0", flexCenterStyle()], {
    variants: {
      done: {
        true: "line-through text-slate-400/50",
      },
    },
  });
  const checkboxStyle = cva([flexCenterStyle()]);

  const onChange = () => {
    if (todo.done && onUndo) onUndo();
    if (!todo.done && onDo) onDo();
  };

  return (
    <div className={style()}>
      <Checkbox
        checked={todo.done}
        className={checkboxStyle()}
        onChange={onChange}
      ></Checkbox>
      <p className={contentStyle({ done: todo.done })}>{todo.content}</p>
    </div>
  );
};
