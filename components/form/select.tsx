import { nanoid } from "nanoid";

export default function Select({
  label,
  name = "",
  options,
  onChange,
}: {
  label: string;
  name?: string;
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const id = nanoid();
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        onChange={(event) => {
          if (onChange) {
            onChange(event);
          }
        }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={nanoid()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
