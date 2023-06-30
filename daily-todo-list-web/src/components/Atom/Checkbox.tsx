import { cva } from "class-variance-authority";
import { ChangeEvent } from "react";

interface Props {
  className?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: Props) => {
  const { checked = false, className, onChange } = props;
  return (
    <span className={style()}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={inputStyle()}
        />
        <span className={checkboxStyle({ className, checked })}>
          <CheckIcon checked={checked}></CheckIcon>
        </span>
      </label>
    </span>
  );
};

const CheckIcon = ({ checked = false }) => {
  const checkIconStyle = cva(
    "my-auto absolute left-1/2 translate-x-[-54%] top-1/2 translate-y-[-46%]"
  );

  if (!checked) return <></>;
  else
    return (
      <i
        className={`pi pi-check ${checkIconStyle()}`}
        style={{ fontSize: "0.2rem" }}
      ></i>
    );
};

const style = cva("w-4 h-4 relative");
const inputStyle = cva("h-0 w-0 absolute hidden peer");
const checkboxStyle = cva(
  ["relative inline-block w-4 h-4 rounded cursor-pointer"],
  {
    variants: {
      checked: {
        true: "bg-emerald-500 text-white",
        false: "bg-gray-100",
      },
    },
  }
);
