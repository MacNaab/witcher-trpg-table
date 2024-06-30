"use client";
import { nanoid } from "nanoid";
import { useState } from "react";

function Thead({ heads }: { heads: string[] }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {heads.map((head) => (
          <th key={nanoid()} scope="col" className="px-6 py-3">
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Tbody({ heads, rows }: { heads: string[]; rows: any }) {
  return (
    <tbody>
      {rows.map((row: any) => (
        <tr
          key={nanoid()}
          className="odd:bg-white odd:dark:bg-gray-900 even:bg-black-100 even:dark:bg-gray-800 border-b dark:border-gray-700"
        >
          {heads.map((head) => {
            if (head == heads[0]) {
              return (
                <td
                  key={nanoid()}
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {row[head]}
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

export default function Table({ heads, rows }: { heads: string[]; rows: any }) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <Thead heads={heads} />
        <Tbody
          heads={heads}
          rows={rows}
        />
      </table>
    </div>
  );
}
