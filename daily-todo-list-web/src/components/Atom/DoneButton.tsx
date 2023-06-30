import { cva } from "class-variance-authority";

export const DoneButton = ({
  onClick,
  visible = true,
}: {
  onClick?: () => void;
  visible?: boolean;
}) => {
  return (
    <button className={style({ visible })} onClick={onClick}>
      <i
        className={`pi pi-check ${checkIconStyle()}`}
        style={{ fontSize: "0.8rem" }}
      ></i>
    </button>
  );
};

const style = cva(
  [
    "bg-transparent w-5 h-5 bg-transparent rounded-full",
    "text-on-surface-dark border border-on-surface-dark",
    "duration-300",
    "hover:text-gray-600 hover:bg-emerald-300 hover:border-emerald-300",
    "relative",
  ],
  {
    variants: {
      visible: {
        true: "opacity-1",
        false: "opacity-0",
      },
    },
  }
);
const checkIconStyle = cva([
  "duration-300",
  "cursor-pointer absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-40%]",
]);
