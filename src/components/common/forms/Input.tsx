import { join } from "@/utils/joinClassNames";
import { type InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  className?: string;
}

export type Ref = HTMLInputElement;

// eslint-disable-next-line react/display-name
const Input = forwardRef<Ref, InputProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <input
      className={twMerge(
        "h-12 w-full rounded-md border border-bca-grey-2 px-3 py-[0.69rem] text-sm font-semibold text-bca-grey-9 placeholder:text-sm placeholder:font-normal focus:border-bca-success-6 focus:outline-none  focus-visible:rounded-md focus-visible:shadow-bca-shadow-green disabled:opacity-50",
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});

export { Input };
