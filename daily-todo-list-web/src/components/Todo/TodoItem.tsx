import {
  useState,
  ChangeEvent,
  PropsWithChildren,
  useEffect,
  useRef,
} from "react";
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
  const [contentInlineStyle, setContentInlineStyle] = useState({});
  const $textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!$textarea.current) return;

    setContentInlineStyle({
      height: `${$textarea.current.scrollHeight}px`,
    });
  }, []);
  const onDoneChange = () => {
    if (todo.done && onUndo) onUndo();
    else if (!todo.done && onDo) onDo();
  };

  const onEdit = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const $target = event.target;
    setContent($target.value);
    setContentInlineStyle({
      height: `${$target.scrollHeight}px`,
    });
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
      <textarea
        className={contentStyle({ done: todo.done })}
        onChange={onEdit}
        value={content}
        style={contentInlineStyle}
        ref={$textarea}
        rows={1}
      >
        {}
      </textarea>
    </div>
  );
};

const style = cva(["w-full flex gap-x-2", "duration-200"]);
const textareaStyle = cva(["resize-none"]);
const contentStyle = cva(
  [
    "m-0 p-0",
    "bg-transparent",
    "focus:outline-none",
    "grow items-start",
    textareaStyle(),
  ],
  {
    variants: {
      done: {
        true: "line-through text-slate-400/50",
      },
    },
  }
);
const checkboxStyle = cva(["mt-[2px] items-start"]);
