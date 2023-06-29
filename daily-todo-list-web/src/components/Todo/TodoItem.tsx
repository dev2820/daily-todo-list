import { useState, ChangeEvent, KeyboardEvent, PropsWithChildren } from "react";
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
  onShiftEnterPress?: () => void;
  className?: string;
}

export const TodoItem = ({
  todo,
  onDo,
  onUndo,
  onRemove,
  onChangeContent,
  onShiftEnterPress,
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

  const onKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.shiftKey && event.key === "Enter" && onShiftEnterPress) {
      event.preventDefault();
      onShiftEnterPress();
    }
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
        onKeyPress={onKeyPress}
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
const textStyle = cva(["placeholder:text-on-surface/25"], {
  variants: {
    done: {
      true: ["line-through", "text-on-surface/50"],
      false: ["text-on-surface"],
    },
  },
});
const checkboxStyle = cva(["items-start mt-[3px]"]);
const removerStyle = cva(
  [
    "mt-1",
    "text-on-surface-dark",
    "hover:text-on-surface",
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
