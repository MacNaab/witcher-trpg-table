import { nanoid } from "nanoid";

export default function Checkbox({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: any;
}) {
  const checkboxId = nanoid();
  return (
    <div className="flex flex-wrap items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
      <input
        type="checkbox"
        value=""
        name={name}
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={checkboxId}
        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export function CheckboxGroup({
  items,
  onChange,
}: {
  items: { label: string; name: string; checked: boolean }[];
  onChange: any;
}) {
  return (
    <div className="flex items-center justify-center gap-4">
      {items.map(({ label, name, checked }) => (
        <Checkbox
          key={name}
          label={label}
          name={name}
          checked={checked}
          onChange={onChange}
        />
      ))}
    </div>
  );
}
