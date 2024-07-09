import { nanoid } from "nanoid";

export default function InputNumber({
  label,
  name = "",
  placeholder = "",
  size = "",
  required = false,
  defaultValue = 0,
  onChange
}: {
  label: string;
  name?: string;
  placeholder?: string;
  size?: string;
  required?: boolean;
  defaultValue?: number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const inputId = nanoid();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) { onChange(event); }
  }

  let css;
  switch (size) {
    case "small":
      css =
        "block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
      break;
    case "large":
      css =
        "block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
      break;
    default:
      css =
        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
      break;
  }

  return (
    <div className="max-w-sm mx-auto">
      <label
        htmlFor={inputId}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="number"
        id={inputId}
        name={name}
        aria-describedby="helper-text-explanation"
        className={css}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        onChange={handleChange}
      />
    </div>
  );
}
