import { cva } from "class-variance-authority";

export const DragHandle = () => {
  return <span className={style()}>::</span>;
};

const style = cva(
  "px-2 leading-[12px] text-lg font-bold hover:cursor-grab text-on-surface-dark select-none"
);
