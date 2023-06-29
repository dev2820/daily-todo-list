import { useState, ChangeEvent, PropsWithChildren } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { Checkbox } from "@/components";
import { AutoHeightTextarea } from "..";

interface Props {
  todo: Todo;
  onDo?: () => void;
  onUndo?: () => void;
  onRemove?: () => void;
  onChangeContent?: (content: string) => void;
  className?: string;
}

export const TodoItem = ({
  todo,
  onDo,
  onUndo,
  onRemove,
  onChangeContent,
  className,
}: PropsWithChildren<Props>) => {
  const [content, setContent] = useState(todo.content);
  const [isHover, setHover] = useState(false);

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
    <div
      className={`${style()} ${className ?? ""}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Checkbox
        checked={todo.done}
        className={checkboxStyle()}
        onChange={onDoneChange}
      ></Checkbox>
      <AutoHeightTextarea
        value={content}
        onChange={onEditContent}
        className={textStyle({ done: todo.done })}
        placeholder="Just Do It!"
      />
      <i
        onClick={onRemove}
        className={`pi pi-trash ${removerStyle({ visible: isHover })}`}
      ></i>
    </div>
  );
};

const style = cva(["pr-3 w-full flex gap-x-2", "duration-200 align-top"]);
const textStyle = cva(["placeholder:text-gray-100/25"], {
  variants: {
    done: {
      true: ["line-through", "text-gray-100/50"],
      false: ["text-gray-100"],
    },
  },
});
const checkboxStyle = cva(["items-start mt-[3px]"]);
const removerStyle = cva(
  [
    "mt-1",
    "text-gray-600",
    "hover:text-gray-100",
    "duration-300",
    "cursor-pointer",
  ],
  {
    variants: {
      visible: {
        true: "opacity-1",
        false: "opacity-0",
      },
    },
  }
);
