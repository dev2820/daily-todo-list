import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

export interface NoteLayoutProps {
  className?: string;
  style?: Record<string, string>;
  title: JSX.Element | string;
}

export const NoteLayout = (props: PropsWithChildren<NoteLayoutProps>) => {
  const { title, children, className, style } = props;

  return (
    <div className={`${layoutStyle()} ${className ?? ""}`} style={style}>
      <div className={metaStyle()}>{title ? Title(title) : ""}</div>
      <div className={contentStyle()}>{children}</div>
    </div>
  );
};

const Title = (title: JSX.Element | string) => {
  return (
    <>
      <h2 className={titleStyle()}>{title}</h2>
      <hr className={hrStyle()} />
    </>
  );
};

const layoutStyle = cva("border px-1 py-2 rounded-md");
const titleStyle = cva("text-2xl px-2 font-bold");
const contentStyle = cva("h-[calc(100%-3rem)]");
const metaStyle = cva("h-[3rem]");
const hrStyle = cva("my-2");
