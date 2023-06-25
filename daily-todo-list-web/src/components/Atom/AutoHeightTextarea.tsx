import { cva } from "class-variance-authority";
import { useState, useRef, useEffect, ChangeEvent } from "react";

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
  const [contentInlineStyle, setContentInlineStyle] = useState({});

  useEffect(() => {
    if (!$textarea.current) return;

    setContentInlineStyle({
      height: `${$textarea.current.scrollHeight}px`,
    });
  }, []);

  const _onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const $target = event.target;
    setContentInlineStyle({
      height: `${$target.scrollHeight}px`,
    });

    if (!onChange) return;
    onChange(event);
  };

  return (
    <textarea
      className={`${contentStyle()} ${className ?? ""}`}
      onChange={_onChange}
      value={value}
      style={contentInlineStyle}
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
  "m-0 p-0",
  "bg-transparent",
  "focus:outline-none",
  "grow items-start",
  textareaStyle(),
]);
