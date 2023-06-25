import { useState, ChangeEvent, PropsWithChildren } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { Checkbox } from "primereact/checkbox";

interface Props {
  todo: Todo;
  onDo?: () => void;
  onUndo?: () => void;
  onChangeContent?: (content: string) => void;
}

export const TodoItem = ({
  todo,
  onDo,
  onUndo,
  onChangeContent,
}: PropsWithChildren<Props>) => {
  const [content, setContent] = useState(todo.content);
  const onDoneChange = () => {
    if (todo.done && onUndo) onUndo();
    if (!todo.done && onDo) onDo();
  };

  const onContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    /**
     * TODO:
     * debounce 적용 할 것
     */
    setContent(event.target.value);

    if (!onChangeContent) return;
    onChangeContent(event.target.value);
  };

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

  return (
    <div className={style()}>
      <Checkbox
        checked={todo.done}
        className={checkboxStyle()}
        onChange={onDoneChange}
      ></Checkbox>
      <input
        className={contentStyle({ done: todo.done })}
        type="text"
        value={content}
        onChange={onContentChange}
      ></input>
    </div>
  );
};
