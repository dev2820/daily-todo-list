import { cva } from "class-variance-authority";

export const DragHandle = () => {
  return <span className={style()}>::</span>;
};

const style = cva(
  "px-2 leading-[16px] text-lg font-bold hover:cursor-pointer text-on-surface select-none"
);
