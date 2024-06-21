import { Checkbox } from "@/components/common";
import { BsCheck } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const CheckBox = ({
  id,
  label,
  height,
  width,
  ischecked,
  onClick,
  onCheckedChange,
  checkboxClassName,
  labelClassName,
  indicatorClassName,
  checkboxContainerClassName,
  disabled,
}: {
  id: string;
  label: string;
  height?: number;
  width?: number;
  ischecked?: boolean;
  onClick?: () => void;
  onCheckedChange?: (checked: boolean) => void;
  checkboxClassName?: string;
  labelClassName?: string;
  indicatorClassName?: string;
  checkboxContainerClassName?: string;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`flex w-fit items-center gap-2 ${checkboxContainerClassName}`}
    >
      <Checkbox.Root
        className={twMerge(
          "flex appearance-none items-center justify-center rounded border border-bca-grey-4 bg-white outline-none focus:shadow-bca-shadow-green",
          `h-${height ?? 4} w-${width ?? 4}`,
          checkboxClassName
        )}
        defaultChecked={false}
        id={id}
        checked={true}
        onClick={onClick}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <Checkbox.Indicator
          className={twMerge(
            `h-full w-full
           bg-bca-green-1 text-white`,
            indicatorClassName
          )}
        >
          <BsCheck className="h-full w-full" />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className={twMerge(
          "text-sm font-semibold text-bca-grey-8",
          labelClassName
        )}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export { CheckBox };
