import { cva } from "class-variance-authority";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const Card = ({ ...props }: Props) => {
  return <div className={cardStyle()}>{props.children}</div>;
};

const cardStyle = cva("border p-2 rounded-md");
