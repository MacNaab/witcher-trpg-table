"use client";
import { nanoid } from "nanoid";

const Star = (
  <svg
    className="w-4 h-4 text-yellow-300 ms-1"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);
const NoStar = (
  <svg
    className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
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
          <th key={nanoid()} scope="col" className="px-6 py-3 text-center">
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
  active_id,
}: {
  heads: string[];
  rows: any;
  active_id: number;
}) {
  return (
    <tbody>
      {rows.map((row: any, n: number) => (
        <tr
          key={nanoid()}
          className={`${
            row.id === active_id
              ? "bg-red-400"
              : "odd:bg-white odd:dark:bg-gray-900 even:bg-black-100 even:dark:bg-gray-800 border-b dark:border-gray-700"
          }`}
        >
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {n + 1}
          </td>
          {heads.map((head) => {
            if (head == heads[0] || head == "Nom") {
              return (
                <td
                  key={nanoid()}
                  scope="row"
                  className="px-6 py-4 text-center font-bold text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row[head]}
                </td>
              );
            }
            if (head == "Favoris") {
              return (
                <td
                  key={nanoid()}
                  className="px-6 py-4 flex justify-center align-middle"
                  onClick={() => row.Favoris()}
                >
                  {row.Starred ? Star : NoStar}
                </td>
              );
            }
            if (head == "Activer" || head == "Supprimer") {
              return (
                <td key={nanoid()} className="px-6 py-4 text-center">
                  <button
                    className={`${
                      head == "Activer"
                        ? "text-red-600 hover:text-red-700"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                    type="button"
                    onClick={row[head]}
                  >
                    {head}
                  </button>
                </td>
              );
            }
            return (
              <td key={nanoid()} className="px-6 py-4 text-center">
                {row[head]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default function EncTable({
  heads,
  rows,
  active_id,
}: {
  heads: string[];
  rows: any;
  active_id: number;
}) {
  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg"
      style={{ maxHeight: "90vh" }}
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <Thead heads={heads} />
        <Tbody heads={heads} rows={rows} active_id={active_id} />
      </table>
    </div>
  );
}
