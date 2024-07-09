"use client";
import { nanoid } from "nanoid";
import { LocalRollPopover } from "@/components/tracker/tracker/affpopover";

const Active = (
  <svg
    stroke="red"
    fill="red"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="2em"
    width="2em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
  </svg>
);

const Skull = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="3em"
    width="3em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M226.063 24.188L222 58.718l32.688 25.626 23.75-50.03c-18.145-9.142-35.272-9.715-52.375-10.127zM166.75 61.093c-24.248 2.93-42.95 15.897-58.875 33.812h.03l96.407 62.594-37.562-96.406zM300.875 88.75l18.656 85.5-91.092-23.875L269 233.938l-140.594-89.375c-3.966 4.875-7.7 9.97-11.22 15.28-28.794 43.465-42.052 101.104-42.905 156.72 40.122 19.627 63.843 40.14 74.032 61.562 9.157 19.25 5.475 39.06-6.343 54.25 25.214 23.382 68.638 37.63 113.155 38.344 44.813.717 89.973-12.083 118.625-38.783-6.033-6.937-10.412-14.346-12.5-22.437-2.8-10.85-.952-22.554 5.188-33.28 11.757-20.542 37.646-39.263 80.062-59.69-.88-52.663-13.855-110.235-42.5-154.405-23.4-36.085-56.548-63.412-103.125-73.375zm-119.28 168.844c27.75 0 50.25 22.5 50.25 50.25s-22.5 50.25-50.25 50.25c-27.752 0-50.25-22.5-50.25-50.25s22.498-50.25 50.25-50.25zm149.468 0c27.75 0 50.25 22.5 50.25 50.25s-22.5 50.25-50.25 50.25-50.25-22.5-50.25-50.25 22.5-50.25 50.25-50.25zm-74.75 86.125c13.74 29.005 24.652 58.023 30.062 87.03-14.777 12.895-41.26 14.766-60.125 0 7.315-29.007 16.12-58.025 30.063-87.03z"></path>
  </svg>
);

function Thead({ heads }: { heads: string[] }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          #
        </th>
        {heads.map((head) => (
          <th key={nanoid()} scope="col" className="px-6 py-3">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Tbody({
  heads,
  rows,
  active_index,
  onBlurChange,
  addText,
}: {
  heads: string[];
  rows: any;
  active_index: number;
  onBlurChange: any;
  addText: any;
}) {
  return (
    <tbody>
      {rows.map((row: any, n: number) => (
        <tr
          key={nanoid()}
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-black-100 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {n + 1}
          </td>
          {heads.map((head) => {
            if (head == "Nom") {
              return (
                <td key={nanoid()} scope="row" className="px-6 py-4">
                  <LocalRollPopover unit={row} addText={addText} />
                </td>
              );
            }
            if (head == "Initiative") {
              return (
                <td key={nanoid()} className="px-6 py-4">
                  {row[head].total}
                </td>
              );
            }
            if (head == "Active") {
              if (n === active_index) {
                return (
                  <td key={nanoid()} className="px-6 py-4">
                    {Active}
                  </td>
                );
              }
              if (row.PS <= 0) {
                return (
                  <td key={nanoid()} className="px-6 py-4">
                    {Skull}
                  </td>
                );
              }
              return <td key={nanoid()} className="px-6 py-4" />;
            }
            if (head == "PS" || head == "END") {
              return (
                <td key={nanoid()} className="px-6 py-4">
                  <div className="inline">
                    <input
                      type="number"
                      defaultValue={row[head]}
                      min="0"
                      max={row.Data.Caract[head]}
                      className="text-center bg-transparent w-12"
                      onBlur={(e) => {
                        onBlurChange(e.target.value, head, row);
                      }}
                    />
                    <div>{` / ${row.Data.Caract[head]}`}</div>
                  </div>
                </td>
              );
            }
            return (
              <td key={nanoid()} className="px-6 py-4">
                {row[head]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default function Table({
  heads,
  rows,
  active_index,
  onBlurChange,
  addText,
}: {
  heads: string[];
  rows: any;
  active_index: number;
  onBlurChange: any;
  addText: any;
}) {
  return (
    <div
      className="relative overflow-x-auto border-gray-600 shadow-md sm:rounded-lg"
      style={{ maxHeight: "90vh" }}
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <Thead heads={heads} />
        <Tbody
          heads={heads}
          rows={rows}
          active_index={active_index}
          onBlurChange={onBlurChange}
          addText={addText}
        />
      </table>
    </div>
  );
}
