import { cva } from "class-variance-authority";
import { useRef, useEffect, ChangeEvent } from "react";

interface Props {
  className?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  placeholder?: string;
}
export const AutoHeightTextarea = ({
  className,
  onChange,
  value,
  placeholder,
}: Props) => {
  const $textarea = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!$textarea.current) return;

    $textarea.current.style.height = "0";
    $textarea.current.style.height = `${$textarea.current.scrollHeight}px`;
  }, []);

  const _onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const $target = event.target;
    if (!$target) return;

    $target.style.height = "auto";
    $target.style.height = $target.scrollHeight + "px";

    if (!onChange) return;
    onChange(event);
  };

  return (
    <textarea
      className={`${contentStyle()} ${className ?? ""}`}
      onChange={_onChange}
      value={value}
      ref={$textarea}
      rows={1}
      placeholder={placeholder ?? ""}
    >
      {}
    </textarea>
  );
};

const textareaStyle = cva(["resize-none"]);
const contentStyle = cva([
  "text-sm",
  "w-0 m-0 p-0",
  "focus:outline-none",
  "grow items-start",
  "placeholder:text-slate-300",
  textareaStyle(),
]);
