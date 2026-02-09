import { ComponentProps } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface RHFTextFieldProps<T extends FieldValues>
  extends Omit<ComponentProps<"input">, "name"> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  isRequired?: boolean;
  errors: FieldErrors<T>;
  validationSchema?: RegisterOptions<T, Path<T>>;
}

function RHFTextField<T extends FieldValues>({
  type = "text",
  label,
  name,
  dir = "rtl",
  register,
  errors,
  isRequired,
  validationSchema,
  ...rest
}: RHFTextFieldProps<T>) {
  const inputError = errors?.[name];
  const hasError = !!inputError;

  return (
    <div className="textField relative">
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <input
        autoComplete="off"
        type={type}
        id={name}
        dir={dir}
        className={`textField__input ${dir === "ltr" ? "text-left" : "text-right"} ${hasError ? "textField--invalid" : ""}`}
        {...register(name, validationSchema)}
        {...rest}
      />

      {hasError && (
        <span className="mt-2 block text-xs text-red-600">
          {String(inputError.message)}
        </span>
      )}
    </div>
  );
}
export default RHFTextField;
