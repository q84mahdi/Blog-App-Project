import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { ComponentProps } from "react";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

interface FileInputProps<T extends FieldValues>
  extends Omit<ComponentProps<"input">, "name" | "type"> {
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
}

function FileInput<T extends FieldValues>({
  label,
  name,
  value,
  errors,
  className,
  dir = "rtl",
  onChange,
  ...rest
}: FileInputProps<T>) {
  const inputError = errors?.[name];
  const hasError = !!inputError;

  return (
    <div className="flex flex-col">
      <label
        htmlFor="file-upload"
        className={`relative flex h-fit cursor-pointer items-center justify-center gap-x-2 rounded-lg border-2 border-primary-900 py-3 text-primary-900 ${className}`}
      >
        {label}

        <ArrowUpTrayIcon className="h-5 w-5" />

        <input
          id="file-upload"
          type="file"
          className="sr-only"
          name={name}
          dir={dir}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </label>

      {hasError && (
        <span className="mt-2 block text-xs text-red-600">
          {String(inputError.message)}
        </span>
      )}
    </div>
  );
}
export default FileInput;
