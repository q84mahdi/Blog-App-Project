import { ComponentProps } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface RHFTextareaProps<T extends FieldValues>
  extends Omit<ComponentProps<"textarea">, "name"> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  isRequired?: boolean;
  errors: FieldErrors<T>;
  validationSchema?: RegisterOptions<T, Path<T>>;
}

function RHFTextarea<T extends FieldValues>({
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  validationSchema,
  className = "",
  rows = 4,
  ...rest
}: RHFTextareaProps<T>) {
  const inputError = errors?.[name];
  const hasError = !!inputError;

  return (
    <div className={`textField relative ${className}`}>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <textarea
        id={name}
        dir={dir}
        rows={rows}
        className={`textField__input resize-none ${dir === "ltr" ? "text-left" : "text-right"} ${hasError ? "textField--invalid" : ""}`}
        {...register(name, validationSchema)}
        {...rest}
      />

      {hasError && (
        <span className="block text-xs text-red-600">
          {String(inputError.message)}
        </span>
      )}
    </div>
  );
}
export default RHFTextarea;
