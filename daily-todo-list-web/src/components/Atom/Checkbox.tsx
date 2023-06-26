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
      <input
        className={`${className ?? ""} ${checkboxStyle()}`}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
    </span>
  );
};

const style = cva("w-4 h-4 relative");
const checkboxStyle = cva("w-4 h-4");
