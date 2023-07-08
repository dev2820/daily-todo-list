import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const BoardLayout = ({ children, className }: Props) => {
  return <div className={laneGroupStyle({ className })}>{children}</div>;
};

const laneGroupStyle = cva("grid grid-rows-2 grid-cols-4 gap-2");
