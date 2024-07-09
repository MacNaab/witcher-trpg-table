"use client";

import { nanoid } from "nanoid";
import { useState } from "react";

export default function Autocomplete({
  label,
  options,
  onChange,
}: {
  label: string;
  options: string[];
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleSelect = (event: React.MouseEvent<HTMLOptionElement>) => {
    setQuery(event.currentTarget.value);
  };

  const myID = nanoid();

  return (
    <div className="m-4">
      <div className="relative">
        <input
          type="text"
          id={myID}
          className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          value={query}
          onChange={handleChange}
          placeholder=" "
          list={`${myID}-list`}
        />
        <label
          htmlFor={myID}
          className="absolute rounded-full text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </label>
        <div
          style={{height: "-webkit-fill-available"}}
          className="min-w-4 py-2 rounded-t-lg absolute top-0 right-0 justify-center flex align-middle hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <button onClick={() => setQuery("")} type="button">X</button>
        </div>
      </div>
      <datalist id={`${myID}-list`}>
        {options
          .filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
          )
          .map((option) => (
            <option key={nanoid()} value={option} onClick={handleSelect}>
              {option}
            </option>
          ))}
      </datalist>
    </div>
  );
}

/*
<label
        htmlFor={myID}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          id={myID}
          value={query}
          onChange={handleChange}
          className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          list={`${myID}-list`}
        />
        */
