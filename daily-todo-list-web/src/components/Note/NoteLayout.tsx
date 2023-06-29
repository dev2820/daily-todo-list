import { PropsWithChildren } from "react";
import { cva } from "class-variance-authority";

export interface NoteLayoutProps {
  className?: string;
  style?: Record<string, string>;
  title?: JSX.Element | string;
  trailing?: JSX.Element;
}

export const NoteLayout = (props: PropsWithChildren<NoteLayoutProps>) => {
  const { title, trailing, children, className, style } = props;

  return (
    <div className={`${layoutStyle()} ${className ?? ""}`} style={style}>
      <Header title={title} trailing={trailing}></Header>
      <div className={contentStyle()}>{children}</div>
    </div>
  );
};

const Header = ({
  title,
  trailing,
}: {
  title?: JSX.Element | string;
  trailing?: JSX.Element;
}) => {
  return (
    <div className={metaStyle()}>
      <h2 className={titleStyle()}>
        <span className="grow">{title}</span>
        <span>{trailing}</span>
      </h2>
    </div>
  );
};

const layoutStyle = cva("border rounded-md bg-surface text-on-surface");
const titleStyle = cva("w-full flex text-xl p-2 font-bold");
const contentStyle = cva("h-[calc(100%-3rem)]");
const metaStyle = cva("h-[3rem] border-b flex");
