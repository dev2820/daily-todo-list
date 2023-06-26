import { ChangeEvent } from "react";

interface Props {
  className?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = (props: Props) => {
  const { checked = false, className, onChange } = props;
  return (
    <input
      className={className}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};
