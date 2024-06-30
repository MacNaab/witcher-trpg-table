import { nanoid } from 'nanoid'

export default function Radio({ label, name }: { label: string; name: string }) {
  const radioId = nanoid();
  return (
    <div className="flex items-center ps-4">
      <input
        id={radioId}
        type="radio"
        value={label}
        name={name}
        className="w-4 h-4 peer mr-2"
      />
      <label
        htmlFor={radioId}
        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        {label}
      </label>
    </div>
  );
}


export function RadioGroup({ items }: { items: { label: string, name: string }[] }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {items.map(({ label, name }) => (
        <Radio key={label} label={label} name={name} />
      ))}
    </div>
  );
}
