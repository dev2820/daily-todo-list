import { cva } from "class-variance-authority";

export const DragHandle = () => {
  return <span className={style()}>::</span>;
};

const style = cva(
  "leading-[18px] text-lg font-bold hover:cursor-pointer text-slate-400 select-none"
);
