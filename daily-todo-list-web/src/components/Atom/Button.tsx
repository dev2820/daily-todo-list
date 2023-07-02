import { cva } from "class-variance-authority";
import { PropsWithChildren, MouseEvent } from "react";

type Props = PropsWithChildren<{
  className?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}>;

export const Button = ({ className, children, onClick }: Props) => {
  return (
    <button className={style({ className })} onClick={onClick}>
      {children}
    </button>
  );
};

const style = cva([
  "inline-block",
  "p-2 rounded-md",
  "text-on-surface bg-transparent",
  "duration-200",
  "cursor-pointer",
  "hover:bg-surface-light",
]);
