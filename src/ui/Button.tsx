import { ComponentProps } from "react";

const btnType = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
} as const;

type Variant = keyof typeof btnType;

interface ButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  variant?: Variant;
}

function Button({
  children,
  loading = false,
  variant = "primary",
  className,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`btn ${btnType[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
export default Button;
