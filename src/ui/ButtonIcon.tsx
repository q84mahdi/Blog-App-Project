import { ComponentProps } from "react";

const btnType = {
  primary:
    "bg-primary-100 text-primary-700 hover:bg-primary-900 hover:text-primary-100",

  secondary:
    "bg-secondary-200 text-secondary-500 hover:bg-secondary-500 hover:text-secondary-0",

  outline:
    "border border-secondary-200 text-secondary-500 hover:bg-secondary-200",

  red: "bg-red-100 text-red-500 hover:bg-red-500 hover:text-red-100",

  danger: "text-red-600 hover:bg-red-100",
} as const;

type Variant = keyof typeof btnType;

interface ButtonIconProps extends ComponentProps<"button"> {
  variant?: Variant;
}

function ButtonIcon({
  children,
  className,
  variant = "primary",
  onClick,
  ...rest
}: ButtonIconProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${btnType[variant]} flex items-center justify-center gap-x-1 rounded p-1 text-xs transition-all duration-300 ease-out lg:text-sm [&>svg]:h-4 [&>svg]:w-4 [&>svg]:text-inherit lg:[&>svg]:h-5 lg:[&>svg]:w-5`}
      {...rest}
    >
      {children}
    </button>
  );
}
export default ButtonIcon;
