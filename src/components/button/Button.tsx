import { type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const VARIANT = {
  primary:
    "bg-blue1 text-white disabled:text-gray-500 focus:outline-none focus-visible:rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed",
  secondary:
    "bg-blue2 text-white disabled:text-gray-500 focus:outline-none focus-visible:rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed",
  homepage:
    "bg-gradient-to-r from-teal-600 to-green-900 h-64 text-white disabled:text-gray-500 focus:outline-none focus-visible:rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed",
  wallet:
    "bg-text-black5 text-white disabled:text-gray-500 focus:outline-none focus-visible:rounded-md disabled:bg-gray-500 disabled:cursor-not-allowed",
};

interface ButtonProps extends ComponentProps<"button"> {
  variant: keyof typeof VARIANT;
  isFullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  variant,
  isFullWidth,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "flex items-center gap-2 rounded-md px-4 py-3 text-base font-normal",
        VARIANT[variant],
        isFullWidth && "w-full",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
