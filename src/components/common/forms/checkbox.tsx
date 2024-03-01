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
}) => {
  return (
    <div
      className={`flex w-fit items-center gap-2 ${checkboxContainerClassName}`}
    >
      <Checkbox.Root
        className={twMerge(
          "flex appearance-none items-center justify-center rounded border bg-white outline-none focus:shadow-bca-shadow-green",
          `h-${height ?? 4} w-${width ?? 4}`,
          checkboxClassName
        )}
        defaultChecked={false}
        id={id}
        checked={ischecked}
        onClick={onClick}
        onCheckedChange={onCheckedChange}
      >
        <Checkbox.Indicator
          className={twMerge(
            `h-4 w-4
          rounded bg-bca-green-1 text-white`,
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
