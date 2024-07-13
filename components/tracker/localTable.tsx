"use client";
import { nanoid } from "nanoid";

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
  editable,
  editableChange,
  escapeEditable,
}: {
  heads: string[];
  rows: any;
  editable: boolean;
  editableChange: any;
  escapeEditable: string[];
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
            const myInput = (
              <input
                type="text"
                defaultValue={row[head]}
                className="text-center bg-transparent"
                onBlur={(e) => editableChange(e.target.value, head, row)}
              />
            );
            if (head == heads[0]) {
              return (
                <td
                  key={nanoid()}
                  scope="row"
                  className={`px-${editable ? "1" : "6"} py-${
                    editable ? "1" : "4"
                  } font-medium text-gray-900 whitespace-nowrap dark:text-white`}
                >
                  {editable ? myInput : row[head]}
                </td>
              );
            }
            if (head == "Éditer" || head == "Supprimer" || head == "Copier") {
              return (
                <td key={nanoid()} className="px-6 py-4">
                  <button
                    className="text-blue-600 hover:text-blue-700"
                    type="button"
                    onClick={row[head]}
                  >
                    {head}
                  </button>
                </td>
              );
            }
            if (head == "Nombre") {
              return (
                <td key={nanoid()} className="px-6 py-4">
                  <input
                    type="number"
                    defaultValue={row[head]}
                    className="text-center bg-transparent"
                    onBlur={(e) => editableChange(e.target.value, head, row)}
                  />
                </td>
              );
            }
            if (head == "Catégorie" && escapeEditable.includes(head)) {
              return (
                <td key={nanoid()} className="px-6 py-4">
                  {row.Data.Categorie}
                </td>
              )
            }
            return (
              <td
                key={nanoid()}
                className={`px-${editable ? "1" : "6"} py-${
                  editable ? "1" : "4"
                }`}
              >
                {editable && !escapeEditable.includes(head)
                  ? myInput
                  : row[head]}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default function TrackerTable({
  heads,
  rows,
  editable = false,
  editableChange = null,
  escapeEditable = [],
}: {
  heads: string[];
  rows: any;
  editable?: boolean;
  editableChange?: any;
  escapeEditable?: any[];
}) {
  return (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg"
      style={{ maxHeight: "90vh" }}
    >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <Thead heads={heads} />
        <Tbody
          heads={heads}
          rows={rows}
          editable={editable}
          editableChange={editableChange}
          escapeEditable={escapeEditable}
        />
      </table>
    </div>
  );
}
