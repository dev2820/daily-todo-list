import { useState, ChangeEvent, PropsWithChildren } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { Checkbox } from "primereact/checkbox";
import { AutoHeightTextarea } from "..";

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

  const onEditContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const $target = event.target;
    setContent($target.value);

    if (!onChangeContent) return;
    onChangeContent($target.value);
  };

  return (
    <div className={`${style()} ${className ?? ""}`}>
      <Checkbox
        checked={todo.done}
        className={checkboxStyle()}
        onChange={onDoneChange}
      ></Checkbox>
      <AutoHeightTextarea
        value={content}
        onChange={onEditContent}
        className={textStyle({ done: todo.done })}
      />
    </div>
  );
};

const style = cva(["w-full flex gap-x-2", "duration-200"]);
const textStyle = cva([], {
  variants: {
    done: {
      true: ["line-through", "text-slate-400/50"],
    },
  },
});
const checkboxStyle = cva(["mt-[2px] items-start"]);
