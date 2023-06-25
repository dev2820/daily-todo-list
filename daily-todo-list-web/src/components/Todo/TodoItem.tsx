import { useState, ChangeEvent, PropsWithChildren, useEffect } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { Checkbox } from "primereact/checkbox";

interface Props {
  todo: Todo;
  onDo?: () => void;
  onUndo?: () => void;
  onChangeContent?: (content: string) => void;
  className?: string;
}

export const TodoItem = ({
  todo,
  onDo,
  onUndo,
  onChangeContent,
  className,
}: PropsWithChildren<Props>) => {
  const [content, setContent] = useState(todo.content);

  const onDoneChange = () => {
    if (todo.done && onUndo) onUndo();
    else if (!todo.done && onDo) onDo();
  };

  const onEdit = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);

    if (!onChangeContent) return;
    onChangeContent(event.target.value);
  };

  return (
    <div className={`${style()} ${className}`}>
      <Checkbox
        checked={todo.done}
        className={checkboxStyle()}
        onChange={onDoneChange}
      ></Checkbox>
      <input
        className={contentStyle({ done: todo.done })}
        type="text"
        value={content}
        onChange={onEdit}
      ></input>
    </div>
  );
};

const style = cva(["flex gap-x-2", "duration-200"]);
const flexCenterStyle = cva("my-auto");
const contentStyle = cva(
  [
    "m-0 p-0",
    "bg-transparent",
    "focus:outline-none",
    "grow",
    flexCenterStyle(),
  ],
  {
    variants: {
      done: {
        true: "line-through text-slate-400/50",
      },
    },
  }
);
const checkboxStyle = cva([flexCenterStyle()]);
