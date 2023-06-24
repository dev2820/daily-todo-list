import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

export const Container = ({ children }: PropsWithChildren) => {
  const containerStyle = cva("border-[1px] rounded p-2");
  return <div className={containerStyle()}>{children}</div>;
};
