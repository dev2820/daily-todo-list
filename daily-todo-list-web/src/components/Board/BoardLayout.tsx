import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

export const BoardLayout = ({ children }: Props) => {
  return <div className={laneGroupStyle()}>{children}</div>;
};
const laneGroupStyle = cva("grid grid-rows-4 grid-cols-2");
