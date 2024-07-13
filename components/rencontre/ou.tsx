"use client";

import { nanoid } from "nanoid";
import { useState } from "react";

export default function Ou({
  zoneForm,
  zoning,
}: {
  zoneForm: any;
  zoning: any;
}) {
  const [unit, setUnit] = useState<any>();
  const [show, setShow] = useState(false);

  const activeZones = Object.entries(zoneForm)
    .filter(([key, value]) => value)
    .map(([key]) => key);

  function getActiveZones() {
    let result: any = [];
    if (activeZones.length === 0) {
      // return 0 zone
    } else {
      // return only selected zones
      activeZones.forEach((element) => {
        result = result.concat(zoning[element]);
      });
      result = result.concat(zoning.Partout);
    }

    return result.sort((a: any, b: any) => a.Nom.localeCompare(b.Nom));
  }

  const sortedZoning = getActiveZones();

  return (
    <div>
      <div>Retourne une  unité aléatoire remplissant au moins un critère</div>
      <div>Nombre d&apos;unités possibles: {sortedZoning.length} </div>
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() =>
            setUnit(
              sortedZoning[Math.floor(Math.random() * sortedZoning.length)]
            )
          }
          className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
        >
          Générer
        </button>
      </div>
      <div className="flex justify-center my-2">
        <div className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md">
            {unit ? unit.Nom : null}
          </span>
        </div>
      </div>
      {activeZones.length > 0 && (
        <div onClick={() => setShow(!show)} className="cursor-pointer p-2 mt-2">
          {show ? "Cacher " : "Afficher "}
          {activeZones.length > 1 ? "les Zones" : "la Zone"} :
        </div>
      )}
      <div>
        {show &&
          activeZones.length > 0 &&
          [
            ...Object.entries(zoneForm)
              .filter(([key, value]) => value)
              .map(([key]) => key),
            "Partout",
          ]
            .sort((a, b) => a.localeCompare(b))
            .map((key) => (
              <div key={nanoid()}>
                <div className="mt-2 uppercase">{key}</div>
                {key === "Partout"
                  ? zoning["Partout"].map((element: any) => (
                      <div key={nanoid()} className="ml-2">
                        {element.Nom}
                      </div>
                    ))
                  : zoning[key].map((element: any) => (
                      <div key={nanoid()} className="ml-2">
                        {element.Nom}
                      </div>
                    ))}
              </div>
            ))}
      </div>
    </div>
  );
}
