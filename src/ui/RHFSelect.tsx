import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface RHFSelectProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isRequired?: boolean;
  options: {
    value: string | number;
    label: string;
  }[];
}

function RHFSelect<T extends FieldValues>({
  label,
  name,
  register,
  errors,
  isRequired,
  options,
}: RHFSelectProps<T>) {
  const inputError = errors?.[name];
  const hasError = !!inputError;

  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>

      <div
        className={`textField__input relative ${hasError ? "textField--invalid" : ""}`}
      >
        <select
          id={name}
          className="w-full appearance-none bg-transparent px-2"
          {...register(name)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute left-5 top-4">
          <ChevronDownIcon className="h-4 w-4" />
        </span>
      </div>

      {hasError && (
        <span className="mt-2 block text-xs text-red-600">
          {String(inputError.message)}
        </span>
      )}
    </div>
  );
}
export default RHFSelect;
