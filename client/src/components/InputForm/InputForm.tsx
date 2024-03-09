import { ChangeEvent, ReactElement } from "react";
type InputType = {
  label?: string;
  placeholder?: string;
  classLabel?: string;
  classInput?: string;
  classIcon?: string;
  type: string;
  id?: string;
  name: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactElement;
  required?: boolean;
  register?: any
  value?: string | number
};
const InputForm =
  (
    {
      label,
      placeholder,
      classLabel,
      classInput,
      classIcon,
      type,
      id,
      name,
      onInput,
      icon,
      required,
      register,
      value
    }: InputType,
  ) => {
    const labels = "block mb-1 mt-3 text-sm font-medium text-gray-300";
    const iconClass =
      "inline-flex shadow-md items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600";
    const input =
      "rounded-none shadow-md rounded-e-lg bg-gray-50 border text-gray-900 input-customize focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
    return (
      <>
        {label && (
          <label htmlFor={id} className={`${classLabel ? classLabel : labels} text-tag-head-light dark:text-tag-head-dark`}>
            {label}
          </label>
        )}
        <div className="flex">
          {icon && (
            <span className={classIcon ? classIcon : iconClass}>{icon}</span>
          )}
          {register ? (
            <input
              {...register(name, { required })}
              autoComplete="false"
              type={type}
              defaultValue={value || ""}
              id={id}
              onInput={onInput}
              className={classInput ? classInput : input}
              placeholder={placeholder}
            />
          ) : (
            <input
              autoComplete="false"
              type={type}
              id={id}
              value={value || ""}
              onInput={onInput}
              className={classInput ? classInput : input}
              placeholder={placeholder}
            />
          )}
        </div>
      </>
    )
  }

export default InputForm;