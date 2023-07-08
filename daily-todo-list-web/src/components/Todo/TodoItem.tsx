import { useState, ChangeEvent, KeyboardEvent, PropsWithChildren } from "react";
import { type Todo } from "@/hooks";
import { cva } from "class-variance-authority";
import { AutoHeightTextarea } from "..";
import { DoneButton } from "@/components";

interface Props {
  todo: Todo;
  onDo?: () => void;
  onUndo?: () => void;
  onRemove?: () => void;
  onChangeContent?: (content: string) => void;
  onKeyPress?: (event: KeyboardEvent, todo?: Todo) => void;
  className?: string;
}

export const TodoItem = ({
  todo,
  onRemove,
  onChangeContent,
  onKeyPress,
  className,
}: PropsWithChildren<Props>) => {
  const [content, setContent] = useState(todo.content);
  const [isHover, setHover] = useState(false);

  const onDone = () => {
    if (!onRemove) return;

    onRemove();
  };

  const onEditContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const $target = event.target;
    setContent($target.value);

    if (!onChangeContent) return;
    onChangeContent($target.value);
  };

  const _onKeyPress = (event: KeyboardEvent) => {
    if (onKeyPress) {
      onKeyPress(event as KeyboardEvent, todo);
    }
  };

  return (
    <div
      className={`${style()} ${className ?? ""}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <AutoHeightTextarea
        value={content}
        spellcheck={false}
        onChange={onEditContent}
        onKeyPress={_onKeyPress}
        className={textStyle({ done: todo.done })}
        placeholder="Just Do It!"
      />
      <DoneButton onClick={onDone} visible={isHover}></DoneButton>
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
