interface Props {
  className?: string;
}
export const HelloWorld = (props: Props) => {
  return <p className={props.className}>Hello World</p>;
};
