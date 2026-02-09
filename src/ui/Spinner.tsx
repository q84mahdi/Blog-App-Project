interface SpinnerProps {
  size?: "small" | "large";
}

function Spinner({ size = "large" }: SpinnerProps) {
  const spinnerSize = {
    large: "spinner",
    small: "spinner-mini",
  };

  return <div className={spinnerSize[size]}></div>;
}
export default Spinner;
